Ext.define('MyApp.model.StudentFeePayment', {
   extend: 'Ext.data.Model',
     fields: [
            'monthly_fee_id', 
            'school_id', 
            'studentname',
            'class_id', 
            'classname',
            'student_id', 
            'for_month', 
            'for_year', 
            'amount', 
            'month',
            'year',
            'status',
            'due_date', 
            'paid_status', 
            'paid_on', 
            'paid_by', 
            'paid_amount',
            'relation'
     ]
});
