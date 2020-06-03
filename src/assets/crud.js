export default {
    postRequest: function (url, formData, _this, successMsg, needRefresh=true) {
        const axios = require('axios');
        axios({
            method: 'post',
            url: url,
            headers: {'content-type': 'multipart/form-data'},
            data: formData})
        .then(function(response) {
            if (response.data === successMsg) {
                if (needRefresh) {
                    _this.refreshData();
                }
                _this.$message({
                    message: '操作完成',
                    type: 'success'
                });
            } else {
				console.log(response.data);
                _this.$message({
                    message: '操作未完成，请重试',
                    type: 'error'
                });
            }
        });
    },
    getRequest: function (url, _this) {
        const axios = require('axios');
        var exThis = this;

        axios.get(url)
        .then(function (response) {
            const data = exThis.parseData(response.data);
            _this.updateData(data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            console.log('Data Get Finished'); 
        });
    },
    parseData: function (rawData) {
        const data = [];
        if (typeof rawData === 'object') {
            data.push[rawData];
            data[0].index = 0;
        }
        else {
            const strData = rawData.split('}');
            strData.pop();
            for (let i in strData) {
				const str = strData[i] + '}';
                data[i] = JSON.parse(str);  
                data[i].index = i;
            }
        }
        return data;
    },
	generateSql: function(oper, row, table) {
		let sql;
		if (oper === 'edit') {
			sql = "UPDATE " + table + " SET";
			for (const index in row) {
				if (index !== "id" && index !== "_XID" && index !== "index") {
					const item = " " + index + "='" + row[index] + "',";
					sql += item;
				}
			}
			sql = sql.substr(0, sql.length-1);
			sql += " WHERE id='" + row.id + "';";
		}
		else if (oper === 'insert') {
			sql = "INSERT INTO " + table + " ";
			let indexes = "(";
			let values = "(";
			for (const index in row) {
				if (index !== "_XID" && index !== "index") {
					indexes += index + ", ";
					values += "'" + row[index] + "', ";
				}
			}
			indexes = indexes.substr(0, indexes.length-2) + ")";
			values = values.substr(0, values.length-2) + ")";
			sql = sql + indexes + " VALUES " + values + ";";
		}
		else {
			sql = "DELETE FROM " + table + " WHERE id = '" + row.id + "';";
		}
		return sql;
	}
}
