// const STOCK_BASE_API = "http://ec2-3-38-81-111.ap-northeast-2.compute.amazonaws.com:8080"
const STOCK_BASE_API = "http://stock-api.advenoh.pe.kr:10025"
const EXPIRATION_LONG_TERM = 1800 // 30 mins
const EXPIRATION_SHORT_TERM = 300 // 5 mins

///////////////////////////////////////////// GetETFProfile /////////////////////////////////////////////

function GetETFProfile(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/etf/profile?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_LONG_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var marketCap = json["marketCap"];
        var totalTradeStock = json["totalTradeStock"];
        var underlyingIndexName = json["underlyingIndexName"];
        var issueDate = json["issueDate"];
        var assetManager = json["assetManager"];
        var nav = json["nav"];
        var operatingExpenseRate = json["operatingExpenseRate"];
        // var miscExpenseRate = json["miscExpenseRate"];
        // var tradingExpenseRate = json["tradingExpenseRate"];

        return [[marketCap, totalTradeStock, underlyingIndexName, issueDate, assetManager, nav, operatingExpenseRate]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


///////////////////////////////////////////// GetMetric /////////////////////////////////////////////

function GetMetric(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/metrics?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_SHORT_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var highWeek52 = json["highWeek52"];
        var lowWeek52 = json["lowWeek52"];
        var yieldMonth1 = json["yieldMonth1"];
        var yieldMonth3 = json["yieldMonth3"];
        var yieldMonth6 = json["yieldMonth6"];
        var yieldYear1 = json["yieldYear1"];

        return [[highWeek52, lowWeek52, yieldMonth1, yieldMonth3, yieldMonth6, yieldYear1]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


///////////////////////////////////////////// GetPriceTarget /////////////////////////////////////////////

function GetPriceTarget(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/price-target?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_SHORT_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var trHighPriceTarget = json["trHighPriceTarget"];
        var trLowPriceTarget = json["trLowPriceTarget"];
        var trAvgPriceTarget = json["trAvgPriceTarget"];
        var naverPriceTarget = json["naverPriceTarget"];

        return [[trHighPriceTarget, trLowPriceTarget, trAvgPriceTarget, naverPriceTarget]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


///////////////////////////////////////////// GetQuote /////////////////////////////////////////////

function GetQuote(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/quotes?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_SHORT_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var currentPrice = json["currentPrice"];

        return [[currentPrice]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}

///////////////////////////////////////////// GetForecast /////////////////////////////////////////////

function GetForecast(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/ratings/forecast?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_LONG_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var naverInvestingOpinion = json["naverInvestingOpinion"];
        var trInvestingOpinion = json["trInvestingOpinion"];

        return [[naverInvestingOpinion, trInvestingOpinion]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


///////////////////////////////////////////// GetTechnical /////////////////////////////////////////////

function GetTechnical(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/ratings/technical?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_LONG_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var trInvestingOpinion = json["trInvestingOpinion"];

        return [[trInvestingOpinion]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


///////////////////////////////////////////// GetSymbol /////////////////////////////////////////////

function GetSymbol(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/stocks/symbols?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_LONG_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var symbolId = json["symbolId"];
        var symbolType = json["type"];
        var stockMarket = json["stockMarket"];
        var shortDescription = json["shortDescription"];
        // var fullDescription = json["fullDescription"];

        return [[symbolType, stockMarket, shortDescription]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


///////////////////////////////////////////// GetSymbolProfile /////////////////////////////////////////////

function GetSymbolProfile(symbolId, ...xpaths) {
    var url = `${STOCK_BASE_API}/v1/stocks/profile?symbolId=${symbolId}`
    var cache = CacheService.getScriptCache();
    var jsonStr = cache.get(url);

    var json
    if (jsonStr != null) {
        json = JSON.parse(jsonStr)
    } else {
        var res = UrlFetchApp.fetch(url);
        var content = res.getContentText();
        json = JSON.parse(content);
        cache.put(url, JSON.stringify(json), EXPIRATION_LONG_TERM)
    }

    if (xpaths.length == 0) {
        //default 응답 값을 반환하면 됨
        var marketCapRank = json["marketCapRank"];
        var foreignerAcquisitionRate = json["foreignerAcquisitionRate"];
        var dividendYield = json["dividendYield"];
        var sector = json["sector"];
        var industry = json["industry"];

        return [[marketCapRank, foreignerAcquisitionRate, dividendYield, sector, industry]]
    }

    var result = []
    for (let i = 0; i < xpaths.length; i++) {
        var key = xpaths[i]
        result.push(json[key])
    }

    if (result.length == 1) {
        return result
    }
    return [result]
}


//Hyperlink 추가 작업중
///////////////////////////////////////////// HYPERLINK 링크 추가 /////////////////////////////////////////////
function LinkNews() {
    var cellId = findCellID("종목")
    console.log('cellId', cellId)


    // createHyperlink();
    getLastNonEmptyCellRange()
    return cellId;
}

function findCellID(searchText, sheetName) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); //"[P1,P2] 관심종목 - 국내주식"
    // var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    var search_text = searchText;
    var range = sheet.getDataRange();
    var values = range.getValues();
    var row, col;

    for (var i = 0; i < values.length; i++) {
        row = i + 1;
        for (var j = 0; j < values[i].length; j++) {
            col = j + 1;
            if (values[i][j] == search_text) {
                var cell = sheet.getRange(row, col);
                var cell_id = cell.getA1Notation();
                return cell_id;
            }
        }
    }
    return "Not found";
}


function getLastNonEmptyCellRange() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var lastRow = sheet.getLastRow();
    Logger.log('lastRow', lastRow)
    var lastNonEmptyRow = sheet.getRange("A:A").getValues().reverse().findIndex(row => row[0] != "") + 1;
    var lastNonEmptyCell = sheet.getRange(lastNonEmptyRow, 1);
    var lastNonEmptyCellRange = lastNonEmptyCell.getA1Notation() + ":" + lastNonEmptyCell.offset(0, 2).getA1Notation(); // Change the offset value if you need a different range size
    Logger.log(lastNonEmptyCellRange);
}

function createHyperlink(searchText, sheetName, cellId) {

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    var cell = sheet.getRange(cellId);
    var url = "https://www.google.com/search?q=" + searchText + "&biw=1028&bih=1174&tbm=nws&sxsrf=APwXEdccFnuDBziH7fXLBccrnVKjn6ijOw%3A1681629685431&ei=9aE7ZJTaGaDj2roPsLGgkAM&ved=0ahUKEwjUqKzg7q3-AhWgsVYBHbAYCDIQ4dUDCA0&uact=5&oq=%EC%84%B1%EC%9D%BC%ED%95%98%EC%9D%B4%ED%85%8D&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgARQjwRY8o5IYImRSGgAcAB4AIABfYgBsAKSAQMyLjGYAQCgAQKgAQHAAQE&sclient=gws-wiz-news"; // Replace with the URL you want to link to
    var displayText = searchText; // Replace with the text you want to display for the hyperlink

    cell.setFormula('=HYPERLINK("' + url + '","' + displayText + '")');
    cell.setFontColor("blue")
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Examples /////////////////////////////////////////////
// 여러 cells에 입력해보기
function exampleWriteMultipleRows() {
    return [2, 3, 4];
}

function exampleWriteMultipleCells() {
    return [[2, 3, 4]];
}