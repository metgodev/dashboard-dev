import ROLES from "../../data/roles";

const DATA_LIMIT = 1

export const requestParams = (area, userDetails) => {
    if (userDetails.roles.length === 2 && userDetails.roles[1].roleName === ROLES.BUSINESS_OWNER) {
        return { $limit: DATA_LIMIT }
    }
    if (Object.keys(area).length > 0) {
        return (
            { areaId: area.id.toString(), $limit: DATA_LIMIT }
        )
    } else {
        return {}
    }
}

export const AG_GRID_LOCALE_HE = {
    // Set Filter
    // selectAll: '(Select All)',
    // selectAllSearchResults: '(Select All Search Results)',
    // searchOoo: 'חיפוש...',
    // blanks: '(Blanks)',
    // noMatches: 'No matches',
    selectAll: 'בחר הכל',
    selectAllSearchResults: 'בחר הכל תוצאות חיפוש',
    searchOoo: 'חיפוש',
    blanks: '(ריק)',
    noMatches: 'אין תוצאות',

    // Number Filter & Text Filter
    // filterOoo: 'Filter...',
    // equals: 'Equals',
    // notEqual: 'Not equal',
    // blank: 'Blank',
    // notBlank: 'Not blank',
    // empty: 'Choose One',
    filterOoo: 'סנן',
    equals: 'שווה',
    notEqual: 'לא שווה',
    blank: 'ריק',
    notBlank: 'לא ריק',
    empty: 'בחר אחד',


    // Number Filter
    // lessThan: 'Less than',
    // greaterThan: 'Greater than',
    // lessThanOrEqual: 'Less than or equal',
    // greaterThanOrEqual: 'Greater than or equal',
    // inRange: 'In range',
    // inRangeStart: 'from',
    // inRangeEnd: 'to',
    lessThan: 'פחות מ',
    greaterThan: 'גדול מ',
    lessThanOrEqual: 'פחות או שווה ל',
    greaterThanOrEqual: 'גדול או שווה ל',
    inRange: 'בטווח',
    inRangeStart: 'מ',
    inRangeEnd: 'עד',

    // Text Filter
    // contains: 'Contains',
    // notContains: 'Not contains',
    // startsWith: 'Starts with',
    // endsWith: 'Ends with',
    contains: 'מכיל',
    notContains: 'לא מכיל',
    startsWith: 'מתחיל ב',
    endsWith: 'מסתיים ב',

    // Date Filter
    // dateFormatOoo: 'yyyy-mm-dd',
    dateFormatOoo: 'dd/mm/yyyy',

    // Filter Conditions
    // andCondition: 'AND',
    // orCondition: 'OR',
    andCondition: 'ו',
    orCondition: 'או',

    // Filter Buttons
    // applyFilter: 'Apply',
    // resetFilter: 'Reset',
    // clearFilter: 'Clear',
    // cancelFilter: 'Cancel',
    applyFilter: 'החל',
    resetFilter: 'אפס',
    clearFilter: 'נקה',
    cancelFilter: 'בטל',

    // Filter Titles
    // textFilter: 'Text Filter',
    // numberFilter: 'Number Filter',
    // dateFilter: 'Date Filter',
    // setFilter: 'Set Filter',
    textFilter: 'סנן טקסט',
    numberFilter: 'סנן מספרים',
    dateFilter: 'סנן תאריך',
    setFilter: 'סנן קבוצה',

    // Side Bar
    // columns: 'Columns',
    // filters: 'Filters',
    columns: 'עמודות',
    filters: 'סנן',

    // columns tool panel
    // pivotMode: 'Pivot Mode',
    // groups: 'Row Groups',
    // rowGroupColumnsEmptyMessage: 'Drag here to set row groups',
    // values: 'Values',
    // valueColumnsEmptyMessage: 'Drag here to aggregate',
    // pivots: 'Column Labels',
    // pivotColumnsEmptyMessage: 'Drag here to set column labels',
    pivotMode: 'מצב ציר',
    groups: 'קבוצות שורות',
    rowGroupColumnsEmptyMessage: 'גרור כאן כדי להגדיר קבוצות שורות',
    values: 'ערכים',
    valueColumnsEmptyMessage: 'גרור כאן כדי לעדכן ערכים',
    pivots: 'תוויות עמודות',
    pivotColumnsEmptyMessage: 'גרור כאן כדי להגדיר תוויות עמודות',


    // Header of the Default Group Column
    // group: 'Group',
    group: 'קבוצה',

    // Row Drag
    // rowDragRows: 'rows',
    rowDragRows: 'שורות',

    // Other
    // loadingOoo: 'Loading...',
    // noRowsToShow: 'No Rows To Show',
    // enabled: 'Enabled',
    loadingOoo: '...טוען',
    noRowsToShow: 'טוען נתונים',
    enabled: 'מופעל',

    // Menu
    // pinColumn: 'Pin Column',
    // pinLeft: 'Pin Left',
    // pinRight: 'Pin Right',
    // noPin: 'No Pin',
    // valueAggregation: 'Value Aggregation',
    // autosizeThiscolumn: 'Autosize This Column',
    // autosizeAllColumns: 'Autosize All Columns',
    // groupBy: 'Group by',
    // ungroupBy: 'Un-Group by',
    // addToValues: 'Add ${variable} to values',
    // removeFromValues: 'Remove ${variable} from values',
    // addToLabels: 'Add ${variable} to labels',
    // removeFromLabels: 'Remove ${variable} from labels',
    // resetColumns: 'Reset Columns',
    // expandAll: 'Expand All',
    // collapseAll: 'Close All',
    // copy: 'Copy',
    // ctrlC: 'Ctrl+C',
    // copyWithHeaders: 'Copy With Headers',
    // copyWithHeaderGroups: 'Copy With Header Groups',
    // paste: 'Paste',
    // ctrlV: 'Ctrl+V',
    // export: 'Export',
    // csvExport: 'CSV Export',
    // excelExport: 'Excel Export',
    pinColumn: 'הצמד עמודה',
    pinLeft: 'הצמד לשמאל',
    pinRight: 'הצמד לימין',
    noPin: 'ללא הצמדה',
    valueAggregation: 'סיכום ערכים',
    autosizeThiscolumn: 'הרחב את העמודה הזאת',
    autosizeAllColumns: 'הרחב את כל העמודות',
    groupBy: 'קבץ לפי',
    ungroupBy: 'בטל קבוצה',
    addToValues: 'הוסף ${variable} לערכים',
    removeFromValues: 'הסר ${variable} מערכים',
    addToLabels: 'הוסף ${variable} לתוויות',
    removeFromLabels: 'הסר ${variable} מתוויות',
    resetColumns: 'אפס עמודות',
    expandAll: 'פתח הכל',
    collapseAll: 'סגור הכל',
    copy: 'העתק',
    ctrlC: 'Ctrl+C',
    copyWithHeaders: 'העתק עם כותרות',
    copyWithHeaderGroups: 'העתק עם קבוצות כותרות',
    paste: 'הדבק',
    ctrlV: 'Ctrl+V',
    export: 'יצוא',
    csvExport: 'יצוא ל-CSV',
    excelExport: 'יצוא ל-Excel',

    // Enterprise Menu Aggregation and Status Bar
    // sum: 'Sum',
    // min: 'Min',
    // max: 'Max',
    // none: 'None',
    // count: 'Count',
    // avg: 'Average',
    // filteredRows: 'Filtered',
    // selectedRows: 'Selected',
    // totalRows: 'Total Rows',
    // totalAndFilteredRows: 'Rows',
    // more: 'More',
    // to: 'to',
    // of: 'of',
    // page: 'Page',
    // nextPage: 'Next Page',
    // lastPage: 'Last Page',
    // firstPage: 'First Page',
    // previousPage: 'Previous Page',
    sum: 'סכום',
    min: 'מינימום',
    max: 'מקסימום',
    none: 'אין',
    count: 'ספירה',
    avg: 'ממוצע',
    filteredRows: 'סוגר',
    selectedRows: 'נבחר',
    totalRows: 'סה"כ',
    totalAndFilteredRows: 'סה"כ',
    more: 'עוד',
    to: 'עד',
    of: 'מתוך',
    page: 'עמוד',
    nextPage: 'עמוד הבא',
    lastPage: 'עמוד אחרון',
    firstPage: 'עמוד ראשון',
    previousPage: 'עמוד קודם',

    // Pivoting
    // pivotColumnGroupTotals: 'Total',
    pivotColumnGroupTotals: 'סה"כ',

    // Enterprise Menu (Charts)
    // pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
    // pivotChart: 'Pivot Chart',
    // chartRange: 'Chart Range',
    pivotChartAndPivotMode: 'תרשים ציר ומצב ציר',
    pivotChart: 'תרשים ציר',
    chartRange: 'טווח תרשים',


    // columnChart: 'Column',
    // groupedColumn: 'Grouped',
    // stackedColumn: 'Stacked',
    // normalizedColumn: '100% Stacked',
    columnChart: 'עמודה',
    groupedColumn: 'קבוצה',
    stackedColumn: 'מְגוּבָּב',
    normalizedColumn: '100% מְגוּבָּב',

    // barChart: 'Bar',
    // groupedBar: 'Grouped',
    // stackedBar: 'Stacked',
    // normalizedBar: '100% Stacked',
    barChart: 'סרגל',
    groupedBar: 'מקובץ',
    stackedBar: 'מְגוּבָּב',
    normalizedBar: '100% מְגוּבָּב',


    // pieChart: 'Pie',
    // pie: 'Pie',
    // doughnut: 'Doughnut',
    pieChart: 'תרשים עוגה',
    pie: 'עוגה',
    doughnut: 'פאי',

    // line: 'Line',
    line: 'קו',

    // xyChart: 'X Y (Scatter)',
    // scatter: 'Scatter',
    // bubble: 'Bubble',
    xyChart: 'X Y (פיזור)',
    scatter: 'פיזור',
    bubble: 'עץ',


    // areaChart: 'Area',
    // area: 'Area',
    // stackedArea: 'Stacked',
    // normalizedArea: '100% Stacked',
    areaChart: 'תרשים שטח',
    area: 'שטח',
    stackedArea: 'מְגוּבָּב',
    normalizedArea: '100% מְגוּבָּב',

    // histogramChart: 'Histogram',
    histogramChart: 'תרשים גרפי',

    // combinationChart: 'Combination',
    // columnLineCombo: 'Column & Line',
    // AreaColumnCombo: 'Area & Column',
    combinationChart: 'שילוב',
    columnLineCombo: 'עמודה וקו',
    AreaColumnCombo: 'שטח ועמודה',

    // Charts
    pivotChartTitle: 'Pivot Chart',
    rangeChartTitle: 'Range Chart',
    settings: 'Settings',
    data: 'Data',
    format: 'Format',
    categories: 'Categories',
    defaultCategory: '(None)',
    series: 'Series',
    xyValues: 'X Y Values',
    paired: 'Paired Mode',
    axis: 'Axis',
    navigator: 'Navigator',
    color: 'Color',
    thickness: 'Thickness',
    xType: 'X Type',
    automatic: 'Automatic',
    category: 'Category',
    number: 'Number',
    time: 'Time',
    xRotation: 'X Rotation',
    yRotation: 'Y Rotation',
    ticks: 'Ticks',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    padding: 'Padding',
    spacing: 'Spacing',
    chart: 'Chart',
    title: 'Title',
    titlePlaceholder: 'Chart title - double click to edit',
    background: 'Background',
    font: 'Font',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    labels: 'Labels',
    size: 'Size',
    minSize: 'Minimum Size',
    maxSize: 'Maximum Size',
    legend: 'Legend',
    position: 'Position',
    markerSize: 'Marker Size',
    markerStroke: 'Marker Stroke',
    markerPadding: 'Marker Padding',
    itemSpacing: 'Item Spacing',
    itemPaddingX: 'Item Padding X',
    itemPaddingY: 'Item Padding Y',
    layoutHorizontalSpacing: 'Horizontal Spacing',
    layoutVerticalSpacing: 'Vertical Spacing',
    strokeWidth: 'Stroke Width',
    offset: 'Offset',
    offsets: 'Offsets',
    tooltips: 'Tooltips',
    callout: 'Callout',
    markers: 'Markers',
    shadow: 'Shadow',
    blur: 'Blur',
    xOffset: 'X Offset',
    yOffset: 'Y Offset',
    lineWidth: 'Line Width',
    normal: 'Normal',
    bold: 'Bold',
    italic: 'Italic',
    boldItalic: 'Bold Italic',
    predefined: 'Predefined',
    fillOpacity: 'Fill Opacity',
    strokeOpacity: 'Line Opacity',
    histogramBinCount: 'Bin count',
    columnGroup: 'Column',
    barGroup: 'Bar',
    pieGroup: 'Pie',
    lineGroup: 'Line',
    scatterGroup: 'X Y (Scatter)',
    areaGroup: 'Area',
    histogramGroup: 'Histogram',
    combinationGroup: 'Combination',
    groupedColumnTooltip: 'Grouped',
    stackedColumnTooltip: 'Stacked',
    normalizedColumnTooltip: '100% Stacked',
    groupedBarTooltip: 'Grouped',
    stackedBarTooltip: 'Stacked',
    normalizedBarTooltip: '100% Stacked',
    pieTooltip: 'Pie',
    doughnutTooltip: 'Doughnut',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'Stacked',
    normalizedAreaTooltip: '100% Stacked',
    scatterTooltip: 'Scatter',
    bubbleTooltip: 'Bubble',
    histogramTooltip: 'Histogram',
    columnLineComboTooltip: 'Column & Line',
    areaColumnComboTooltip: 'Area & Column',
    customComboTooltip: 'Custom Combination',
    noDataToChart: 'No data available to be charted.',
    pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
    chartSettingsToolbarTooltip: 'Menu',
    chartLinkToolbarTooltip: 'Linked to Grid',
    chartUnlinkToolbarTooltip: 'Unlinked from Grid',
    chartDownloadToolbarTooltip: 'Download Chart',
    seriesChartType: 'Series Chart Type',
    seriesType: 'Series Type',
    secondaryAxis: 'Secondary Axis',


    // ARIA
    ariaChecked: 'checked',
    ariaColumn: 'Column',
    ariaColumnGroup: 'Column Group',
    ariaColumnList: 'Column List',
    ariaColumnSelectAll: 'Toggle Select All Columns',
    ariaDateFilterInput: 'Date Filter Input',
    ariaDefaultListName: 'List',
    ariaFilterColumnsInput: 'Filter Columns Input',
    ariaFilterFromValue: 'Filter from value',
    ariaFilterInput: 'Filter Input',
    ariaFilterList: 'Filter List',
    ariaFilterToValue: 'Filter to value',
    ariaFilterValue: 'Filter Value',
    ariaFilteringOperator: 'Filtering Operator',
    ariaHidden: 'hidden',
    ariaIndeterminate: 'indeterminate',
    ariaInputEditor: 'Input Editor',
    ariaMenuColumn: 'Press CTRL ENTER to open column menu.',
    ariaRowDeselect: 'Press SPACE to deselect this row',
    ariaRowSelectAll: 'Press Space to toggle all rows selection',
    ariaRowToggleSelection: 'Press Space to toggle row selection',
    ariaRowSelect: 'Press SPACE to select this row',
    ariaSearch: 'Search',
    ariaSortableColumn: 'Press ENTER to sort',
    ariaToggleVisibility: 'Press SPACE to toggle visibility',
    ariaUnchecked: 'unchecked',
    ariaVisible: 'visible',
    ariaSearchFilterValues: 'Search filter values',

    // ARIA Labels for Drop Zones

    ariaRowGroupDropZonePanelLabel: 'Row Groups',
    ariaValuesDropZonePanelLabel: 'Values',
    ariaPivotDropZonePanelLabel: 'Column Labels',
    ariaDropZoneColumnComponentDescription: 'Press DELETE to remove',
    ariaDropZoneColumnValueItemDescription: 'Press ENTER to change the aggregation type',

    // ARIA Labels for Dialogs
    ariaLabelColumnMenu: 'Column Menu',
    ariaLabelCellEditor: 'Cell Editor',
    ariaLabelDialog: 'Dialog',
    ariaLabelSelectField: 'Select Field',
    ariaLabelTooltip: 'Tooltip',
    ariaLabelContextMenu: 'Context Menu',
    ariaLabelSubMenu: 'SubMenu',
    ariaLabelAggregationFunction: 'Aggregation Function',

    // Number Format (Status Bar, Pagination Panel)
    thousandSeparator: ',',
    decimalSeparator: '.'
}


export const gridOptions = {
    defaultColDef: {
        editable: false,
        sortable: true,
        resizable: true,
        filter: true,
        floatingFilter: true,
        rowGroupPanelShow: 'always',
        enableRangeSelection: true,
        rowDragManaged: true,
        enableCellChangeFlash: true,
        suppressColumnVirtualisation: true,
        suppressRowVirtualisation: true,
        debounceVerticalScrollbar: true,
        suppressCsvExport: true,
        suppressExcelExport: true,
        animateRows: true,
        rowSelection: 'multiple',
        refreshCells: true,
    },
    sideBar: {
        toolPanels: [
            {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                toolPanelParams: {
                    suppressRowGroups: true,
                    suppressValues: true,
                    suppressPivots: true,
                    suppressPivotMode: true,
                    suppressColumnFilter: true,
                    suppressColumnSelectAll: true,
                    suppressColumnExpandAll: true,
                },
            },
        ],
    },
    statusBar: {
        statusPanels: [
        ],
    },
    paginationAutoPageSize: true,
    // pagination: true,
    enableRtl: true,
    localeText: AG_GRID_LOCALE_HE,
};

export const idOptions = {
    hide: true,
    editable: false,
    sortable: false,
    filter: false,
    floatingFilter: false,
    resizable: false,
    rowGroupPanelShow: 'never',
    suppressToolPanel: true,
    suppressMovable: true,
    suppressNavigable: true,
    suppressFilter: true,
    suppressMenu: true,
    suppressSorting: true,
    suppressResize: true,
    suppressSizeToFit: true,
    suppressRowClickSelection: true,
    suppressRowHoverHighlight: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: true,
    suppressColumnsToolPanel: true,
};

export const ignore = ['businessId', 'firebaseId', 'objects', 'coverImage', 'locationInfo', 'categoryId', 'tagId', 'reservations', 'coverImageFileId', 'objectIds', '__v', 'areaId', 'authorityId', 'location', 'tagsIds', 'galleryFileIds', 'gallery', 'userId', 'relatedBusinessId', 'area']

export const excelStyles = [
    {
        id: 'numberType',
        numberFormat: {
            format: '0',
        },
    },
    {
        id: 'currencyFormat',
        numberFormat: {
            format: '#,##0.00 €',
        },
    },
    {
        id: 'negativeInBrackets',
        numberFormat: {
            format: '$[blue] #,##0;$ [red](#,##0)',
        },
    },
    {
        id: 'booleanType',
        dataType: 'Boolean',
    },
    {
        id: 'stringType',
        dataType: 'String',
    },
    {
        id: 'dateType',
        dataType: 'DateTime',
    },
];