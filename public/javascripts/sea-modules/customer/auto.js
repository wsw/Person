/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-27
 * Time: 下午3:26
 * To change this template use File | Settings | File Templates.
 */
define(function(require, module, exports) {
    var AutoComplete = require('autocomplete');

    new AutoComplete({
        trigger: '#search',
        dataSource: "/data?key={{query}}",
        width: 150
    }).render();
})