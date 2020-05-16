export default {
    postRequest: function (url, formData, _this, successMsg) {
        const axios = require('axios');
        axios({
            method: 'post',
            url: url,
            headers: {'content-type': 'multipart/form-data'},
            data: formData})
        .then(function(response) {
            if (response.data === successMsg) {
                _this.refreshData();
                _this.$message({
                    message: '操作完成',
                    type: 'success'
                });
            } else {
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
                data[i] = JSON.parse(strData[i] + '}');  
                data[i].index = i;
            }
        }
        return data;
    }
}
