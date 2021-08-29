
    var inputBox = {
        init: function (obj) {
            var that = this;
            this.wechat = document.getElementsByName('wechat')[0];
            this.qq = document.getElementsByName('qq')[0];
            this.test_date = document.getElementsByName('test_date')[0];
            this.pending = document.getElementById('pending');
            this.test_plan = document.getElementsByName('test_plan');
            this.city = document.getElementById('city_ipt');
            this.status1 = document.getElementsByName('status1');
            this.status2 = document.getElementsByName('status2');
            this.status3 = '';
            this.status4 = document.getElementsByName('status4');
            this.ps = document.getElementsByName('ps')[0];
            this.recruit_thread_id = document.getElementsByName('recruit_thread_id')[0];
            this.btn = obj.getElementsByClassName('subBtn')[0];
            this.tip = obj.getElementsByClassName('tip')[0];
            this.tip1 = obj.getElementsByClassName('tip1')[0];
            this.selectCon = obj.getElementsByClassName('selectCon')[0];
            this.selects = this.selectCon.getElementsByTagName('button');
            this.selectVal = obj.getElementsByClassName('selectIpt')[0];
            this.placeholder = obj.getElementsByClassName('selectItem')[0].getElementsByClassName('placeholder')[0];
            this.disabledDiv = obj.getElementsByClassName('disabled')[0];
            this.test_plans = [];
            this.statuss = [];
            if (!$('extcreditmenu')) {
                this.btn.disabled = true;
                this.btn.style.background = '#ccc';
                this.btn.style.borderColor = '#ccc';
                this.tip1.style.display = 'inline';
            }
            this.pending.onclick = function () {
                if(!!that.pending.checked){
                    that.test_date.setAttribute('disabled','disabled');
                    that.test_date.value = '1970-01-01';
                }else {
                    that.test_date.removeAttribute('disabled');
                    that.test_date.value = '';
                }
            }
            this.btn.onclick = function () {
                that.submit();
            }
            for(var i=0;i<this.status2.length;i++){
                this.status2[i].onclick = function () {
                    that.check(this);
                }
            }
            window.onclick = function (e) {
                if(e.target.className !== 'placeholder' && e.target.className !== 'selectIpt' && e.target.className !== 'selectCon'){
                    that.selectCon.style.display = 'none';
                }else {
                    that.selectCon.style.display = 'block';
                }
            }
            for(var i=0;i<this.selects.length;i++){
                this.selects[i].onclick = function () {
                    that.select(this);
                }
            }
        },
        select: function (obj) {
            for(var i=0;i<this.selects.length;i++){
                this.selects[i].className = '';
            }
            obj.className = 'checked';
            this.selectVal.innerHTML = obj.innerHTML;
            this.placeholder.style.display = 'none';
        },
        check: function (obj) {
            for(var i=0;i<this.status2.length;i++){
                if(this.status2[i].value !== obj.value){
                    this.status2[i].checked = false;
                    this.status2[i].parentNode.className = '';
                    this.disabledDiv.style.display = 'block';
                    for(var j=0;j<this.selects.length;j++){
                        this.selects[j].className = '';
                    }
                    this.selectVal.innerHTML = '';
                    this.placeholder.style.display = 'block';
                }
            }
            if(!!obj.checked){
                obj.parentNode.className = 'checked';
                this.disabledDiv.style.display = 'none';
            }else {
                obj.parentNode.className = '';
                this.disabledDiv.style.display = 'block';
                for(var i=0;i<this.selects.length;i++){
                    this.selects[i].className = '';
                }
                this.selectVal.innerHTML = '';
                this.placeholder.style.display = 'block';
            }
        },
        submit: function () {
            this.city = document.getElementById('city_ipt');
            this.status3 = this.selectVal.innerHTML;
            var dataArr = [];
            if (!!this.wechat) {
                if (!this.wechat.value) {
                    showDialog("请填写微信号码!", 'notice');
                    return false;
                } else {
                    dataArr.push('wechat=' + this.wechat.value);
                }
            }
            if (!!this.qq) {
                var qqreg = /^\d{5,15}$/;
                if (!this.qq.value) {
                    showDialog("请填写QQ号码!", 'notice');
                    return false;
                } else if (!qqreg.test(this.qq.value)) {
                    showDialog("请输入正确的QQ号码!", 'notice');
                    return false;
                } else {
                    dataArr.push('qq=' + this.qq.value);
                }
            }

            if (!!this.test_date) {
                if (!this.test_date.value) {
                    showDialog("请选择考试日期!", 'notice');
                    return false;
                } else {
                    dataArr.push('test_date=' + this.test_date.value);
                }
            }
            if (this.test_plan.length > 0) {
                this.test_plans = [];
                for (i in this.test_plan) {
                    if (this.test_plan[i].checked) {
                        this.test_plans.push(this.test_plan[i].value)
                    }
                }
                if (this.test_plans.length === 0) {
                    showDialog("请选择计划何时考试!", 'notice');
                    return false;
                } else {
                    dataArr.push('test_plan=' + this.test_plans.join(','));
                }
            }
            if (!!this.city) {
                if (!this.city.innerHTML) {
                    showDialog("请选择您所在的城市!", 'notice');
                    return false;
                } else {
                    dataArr.push('city=' + this.city.getAttribute('data_name'));
                    var ids = this.city.getAttribute('data').split('-');
                    if (ids.length > 0) {
                        dataArr.push('country_id=' + ids[0]);
                        if (ids.length > 1) {
                            dataArr.push('province_id=' + ids[1]);
                            if (ids.length > 2) {
                                dataArr.push('city_id=' + ids[2]);
                            }
                        }
                    }
                }
            }
            if(this.status1.length > 0){
                var statuss1 = [];
                for(i in this.status1){
                    if(this.status1[i].checked){
                        statuss1.push(this.status1[i].value)
                    }
                }
                if(statuss1.length > 0){
                    dataArr.push('status1=' + statuss1.join(','));
                }else{
                    showDialog("请选择当前情况!", 'notice');
                    return false;
                }
            }
            if(this.status2.length > 0){
                this.statuss = '';
                for(i in this.status2){
                    if(this.status2[i].checked){
                        this.statuss = this.status2[i].value;
                    }
                }
                if(!!this.statuss){
                    dataArr.push('status2=' + this.statuss);
                }else{
                    showDialog("请选择当前情况!", 'notice');
                    return false;
                }
            }
            if(!!this.statuss && !this.status3){
                showDialog("请选择对应的当前情况!", 'notice');
                return false;
            }else if(!!this.statuss && !!this.status3){
                dataArr.push('status3=' + this.status3);
            }
            if(this.status4.length > 0){
                var statuss4 = [];
                for(i in this.status4){
                    if(this.status4[i].checked){
                        statuss4.push(this.status4[i].value)
                    }
                }
                if(statuss4.length > 0){
                    dataArr.push('status4=' + statuss4.join(','));
                }else{
                    showDialog("请选择当前情况!", 'notice');
                    return false;
                }
            }
            if (!!this.ps) {
                dataArr.push('ps=' + this.ps.value);
            }
            dataArr.push('recruit_thread_id=' + this.recruit_thread_id.value);
            var that = this;
            var dataIn = dataArr.join("&");
            this.ajax({
                url: 'https://id.chasedream.com/recruit',
                method: 'post',
                data: dataIn,
                fn: function (data) {
                    if (data.msg === 'success') {
                        that.tip.style.display = 'block';
                        var count = that.tip.getElementsByClassName('count')[0];
                        var t = 3
                        var timmer = setInterval(function () {
                            t--;
                            if(t <= 0){
                                t = 0
                                window.location.href = data.data.url;
                                clearInterval(timmer);
                            }
                            count.innerHTML = t;
                        },1000);
                    } else {
                        showDialog("提交失败!", 'notice');
                    }
                }
            });
        },
        ajax: function (json) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            var j = {};
            j.method = json.method || 'get';
            j.url = json.url || '';
            j.data = json.data || '';
            j.dataType = json.dataType || 'json';
            j.fn = json.fn || function () { };
            if (j.method == 'get' && j.data) {
                j.url += '?' + j.data;
            }
            xhr.open(j.method, j.url, true);
            xhr.withCredentials = true;
            if (j.method == 'get') {
                xhr.send();
            } else {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(j.data);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (j.dataType == 'text') {
                            j.fn(xhr.responseText);
                        } else if (j.dataType == 'xml') {
                            j.fn(xhr.responseXML);
                        } else if (j.dataType == 'json') {
                            j.fn(JSON.parse(xhr.responseText));
                        }
                    }
                }
            }
        }
    }
    if ($('form_user_info')) {
        inputBox.init($('form_user_info'));
    }
    if(!!document.getElementById('dateText')){
        laydate.render({
            elem: '#dateText', //指定元素
            trigger: 'click'
        });
    }

