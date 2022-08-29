const SHEET_ID = "1Tn4cw51ujUZIXCRERo4ogYGQzBh8bzCwBRds63lbV9g";

function doPost(e) {
  var JsonDATA = JSON.parse(e.postData.getDataAsString());
  if (JsonDATA.dataType == "subject_verify") {

  }
  else if (JsonDATA.dataType == "saveData") {
    values = text2array(JsonDATA.csvText);
    saveData(values, JsonDATA.day);
  }
}


function text2array(text) {
  log_insert("2.1");
  log_insert(text);
  values = Utilities.parseCsv(text);
  return values;
}

function addDayColumn(values, day) {
  /**
   * 日付の列を末尾に付与
   */
  for (let i = 0; i < values.length; i++) {
    values[i].push(day);
  }
  return values
}

function addTimeStampColumn(values, time) {
  for (let i = 0; i < values.length; i++) {
    values[i].push(time);
  }
  return values
}

function saveData(values, day) {
  /**
   * 実験データの保存
   */

  // day1 or day2 の情報の付与
  values = addDayColumn(values, day);

  time = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
  values = addTimeStampColumn(values, time);

  // データの挿入先のシートと, 挿入すべき行を取得
  let insert_ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = insert_ss.getSheetByName("results");
  let lastRow = sheet.getDataRange().getLastRow();

  // 見出しの行を削除
  values.shift();
  // シートに保存
  sheet.getRange(lastRow + 1, 1, values.length, values[0].length).setValues(values);
}

function log_insert(text) {
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("log");
  var lastRow = parseInt(sheet.getLastRow());
  console.log(lastRow+1);


  // sheet.getRange(lastRow+1, 1, 1, 1).setValue(text);
  sheet.appendRow([text]);
}

function test() {
  log_insert("aaa");
}
