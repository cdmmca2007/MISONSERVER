Ext.define('MyApp.store.FineRuleComboStore', {
    extend: 'Ext.data.Store',
    model:'MyApp.model.Master',
    proxy: {
         type: 'ajax',
         url: 'fine/getFineRuleCombo.do',
         reader: {
             type: 'json',
             root: 'rows'
         }
     },
     autoLoad:false
});
