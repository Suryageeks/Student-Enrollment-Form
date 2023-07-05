var baseUrl = 'http://api.login2explore.com:5577';
var IRL = '/api/irl';
var IML = '/api/iml';
var IMLSET = '/api/iml/set';
var database = 'STUDENT-DB';
var relation = 'STUDENT-TABLE';
var token = '90933024|-31949323554460475|90949861'

function resetForm() {
    $('#roll').val('');
    $('#name').val('');
    $('#class').val('');
    $('#bd').val('');
    $('#ads').val('');
    $('#ed').val('');
}

function disableEverything() {
    resetForm();
    $('#roll').prop("disabled", false);
    $('#roll').focus();
    $('#name').prop("disabled", true);
    $('#class').prop("disabled", true);
    $('#bd').prop("disabled", true);
    $('#ads').prop("disabled", true);
    $('#ed').prop("disabled", true);
    $('#save').prop("disabled", true);
    $('#update').prop("disabled", true);
    $('#reset').prop("disabled", true);    
}
disableEverything();

function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
        + "\"token\" : \""
        + token
        + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
        + "\"dbName\": \""
        + dbname
        + "\",\n"
        + "\"rel\" : \""
        + relationName
        + "\",\n"
        + "\"jsonStr\":\n"
        + jsonObjStr
        + "\,"
        + "\"createTime\":"
        + createTime
        + "\,"
        + "\"updateTime\":"
        + updateTime
        + "\n"
        + "}";
    return value1;
}

function getId(id) {
    var roll = id.value;
    var obj = {
        Roll: roll
    };
    var jsonObj = JSON.stringify(obj);
    var req = createGET_BY_KEYRequest(token, database, relation, jsonObj);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (res.status == 400) {        
        $('#name').prop("disabled", false);
        $('#name').focus();
        $('#class').prop("disabled", false);
        $('#bd').prop("disabled", false);
        $('#ads').prop("disabled", false);
        $('#ed').prop("disabled", false);
        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
    }else{
        $('#roll').prop("disabled", true);
        $('#name').prop("disabled", false);
        $('#class').prop("disabled", false);
        $('#bd').prop("disabled", false);
        $('#ads').prop("disabled", false);
        $('#ed').prop("disabled", false);
        $('#save').prop("disabled", true);
        $('#update').prop("disabled", false);
        $('#reset').prop("disabled", false);
        var result = JSON.parse(res.data).record;
        $('#name').val(result.Name)
        $('#class').val(result.Class);
        $('#bd').val(result.Birth_Date);
        $('#ads').val(result.Address);
        $('#ed').val(result.Enrollment_Date);
    }
}

function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}

function saveData(){
    $("#ajax").html("wait");
    var roll=$("#roll").val();
    var name=$('#name').val();
    var classes=$('#class').val();
    var bd=$('#bd').val();
    var address=$('#ads').val();
    var ed=$('#ed').val();
    if(roll==''){
        $("#roll").focus();
        return;
    }
    if(name==''){
        $("#name").focus();
        return;
    }
    if(classes==''){
        $("#class").focus();
        return;
    }
    if(bd==''){
        $("#bd").focus();
        return;
    }
    if(address==''){
        $("#ads").focus();
        return;
    }
    if(ed==''){
        $("#ed").focus();
        return;
    }
    var obj = {
        Roll:roll,
        Name:name,
        Class:classes,
        Birth_Date:bd,
        Address:address,
        Enrollment_Date:ed
    };
    var jsonObj = JSON.stringify(obj);
    var req=createPUTRequest(token,jsonObj,database,relation);
    jQuery.ajaxSetup({async:false});
    var res=executeCommand(req,IML);
    jQuery.ajaxSetup({async:true});
    disableEverything();
}

function createSETRequest(token, jsonStr, dbName, relName, type, primaryKey, uniqueKeys, foreignKeys) {
    if (type === undefined) {
        type = "DEFAULT";
    }
    var req = {
        token: token,
        cmd: "SET",
        dbName: dbName,
        rel: relName,
        type: type,
        jsonStr: JSON.parse(jsonStr)
    };
    if (primaryKey !== undefined) {
        req.primaryKey = primaryKey;
    }
    if (uniqueKeys !== undefined) {
        req.uniqueKeys = uniqueKeys;
    }
    if (foreignKeys !== undefined) {
        req.foreignKeys = foreignKeys;
    }
    req = JSON.stringify(req);
    return req;
}

function updateData(){
    var roll=$("#roll").val();
    var name=$('#name').val();
    var classes=$('#class').val();
    var bd=$('#bd').val();
    var address=$('#ads').val();
    var ed=$('#ed').val();
    if(name==''){
        $("#name").focus();
        return;
    }
    if(classes==''){
        $("#class").focus();
        return;
    }
    if(bd==''){
        $("#bd").focus();
        return;
    }
    if(address==''){
        $("#ads").focus();
        return;
    }
    if(ed==''){
        $("#ed").focus();
        return;
    }
    var obj = {
        Roll:roll,
        Name:name,
        Class:classes,
        Birth_Date:bd,
        Address:address,
        Enrollment_Date:ed
    };
    var jsonObj = JSON.stringify(obj);
    var req=createSETRequest(token,jsonObj,database,relation,'UPDATE','Roll');
    jQuery.ajaxSetup({async:false});
    var res=executeCommand(req,IMLSET);
    jQuery.ajaxSetup({async:true});
    disableEverything();
}
