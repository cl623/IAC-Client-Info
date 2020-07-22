function doGet(e) {
 const list = ['claggui@innovativeautism.org','jlaggui@innovativeautism.org','jlison@innovativeautism.org']
 var whitelisted = false;
 var iconUrl = 'https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png';
 var user = Session.getActiveUser().getEmail()
   for(var i = 0; i < list.length; i++){
     if(user == list[i]){
       whitelisted=true;
     }
   }
  if(whitelisted){
    if(!e.parameter.page || e.parameter['page'] == 'Info'){
      return HtmlService.createTemplateFromFile("Info").evaluate().setTitle("Client Information").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Assigned_Staff'){
      return HtmlService.createTemplateFromFile('Assigned_Staff').evaluate().setTitle("Assigned Staff").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Schedule'){
      return HtmlService.createTemplateFromFile('Schedule').evaluate().setTitle("Schedule").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Insurance'){
      return HtmlService.createTemplateFromFile('Insurance').evaluate().setTitle("Insurance").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Authorization'){
      return HtmlService.createTemplateFromFile('Authorization').evaluate().setTitle("Authorization").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Medical'){
      return HtmlService.createTemplateFromFile('Medical').evaluate().setTitle("Medical").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Report'){
      return HtmlService.createTemplateFromFile('Report').evaluate().setTitle("Report").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Documents'){
      return HtmlService.createTemplateFromFile('Document').evaluate().setTitle("Document").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
    else if(e.parameter['page'] == 'Intake'){
      return HtmlService.createTemplateFromFile('Intake').evaluate().setTitle("Intake").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
    }
  }
  else
    return HtmlService.createTemplateFromFile("Error").evaluate().setTitle("Error: Access Denied").setFaviconUrl('https://le-cdn.website-editor.net/890182a9e4384ae6930cd502f9f32152/dms3rep/multi/opt/IAC+FINAL+%7C+Large-480w.png');
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Retrieves script url from ScriptApp service
 *
 * @return {string} the webapp url
 */
function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}
/*
 * Contains info to connect to database
 */      
function databaseConnect(){
  var connection = PropertiesService.getScriptProperties().getProperties();
  
  return connection;
}
/*
 * Creates connection to database
 */
  function connect(connection){
    var connection = connection
    var url = connection.url
    var user = connection.user
    var password = connection.password
    var conn = Jdbc.getCloudSqlConnection(url, user, password);
  return conn;
    
  }
/*
 * Download list of clients
 */
  function loadClients(){
    var dbConnect = databaseConnect();
    var conn = connect(dbConnect);
    var stmt = conn.createStatement();    
    var query = "select concat(FirstName,' ',LastName) as Name,ClientId,FolderLink,IacStatus from client;";
    var data = stmt.executeQuery(query);
    var numCol = data.getMetaData().getColumnCount();
    var arr = [];
    var obj = {};
    
    while(data.next()){
      obj['Name'] = data.getString('Name');
      obj['ClientId'] = data.getString('ClientId');
      obj['FolderLink'] = data.getString('FolderLink');
      obj['IacStatus'] = data.getString('IacStatus');
            
    arr.push(obj);
    obj = {};
    }
   
    stmt.close();
    conn.close();
    var json = JSON.stringify(arr);
   return json;
  }