Ext.define('MyApp.model.AccountSetting', {
   extend: 'Ext.data.Model',
     fields: [
            'pid',
            'primary_ques',
            'primary_ans',
            'secondary_ques',
            'secondary_ans',
            'passwarning',
            'password_recovery_emailid',
            'createdby',
            'modifiedby',  
            'result',
            'password_expiry_warning','userid'
]
});
