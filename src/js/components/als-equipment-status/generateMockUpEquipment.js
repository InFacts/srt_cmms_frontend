function onGeneratedRow(columnsResult) {
    var jsonData = {};
    columnsResult.forEach(function(column) 
    {
        var columnName = column.metadata.colName;
        jsonData[columnName] = column.value;
    });
    viewData.employees.push(jsonData);
}

onGeneratedRow(["data", "test"])