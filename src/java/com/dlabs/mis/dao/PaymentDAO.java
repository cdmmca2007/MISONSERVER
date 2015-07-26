/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.TemplateDetail;
import com.dlabs.mis.model.Templates;
import com.dlabs.mis.model.Property;
import com.dlabs.mis.model.FeeStructure;
import com.dlabs.util.StringUtil;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh the admin
 */
@Repository
public class PaymentDAO {
    @Autowired
    JSONUtil jsonUtil;
    @Autowired
    private Properties sqlQueries;

    public Templates addOrEditTemplate(Connection conn, Templates template) throws ReadableException {
        String query;
        Object[] params = null;
        String id;
        if (StringUtil.isNullOrEmpty(template.getId())) {
            id = UUID.randomUUID().toString();
            query = sqlQueries.getProperty("INSERT_TEMPLATE");
            params = new Object[]{id,
                                  template.getName(),
                                  template.getComment(),
                                  template.getCreatedby(),
                                  template.getModifiedby()
                                 };
            //id,NAME,COMMENT,createdby,modifiedby,
        } else {
            id = template.getId();
            query = sqlQueries.getProperty("UPDATE_TEMPLATE");
            params = new Object[]{template.getName(), template.getComment(),template.getModifiedby(),id};
        } 
        int c = DaoUtil.executeUpdate(conn, query, params);
        if(c>0){
            String[] classes = template.getClasses();
            query = sqlQueries.getProperty("UPDATE_CLASSES_TPL");
            for(int i=0; i<classes.length; i++){
                DaoUtil.executeUpdate(conn, query, new Object[]{id,new GetBatch(classes[i],template.getSessionid()).BatchId(conn)});
            }
        }
        return template;
        
    }

    public JSONObject getTemplate(Connection conn, String id) throws ReadableException {
        String query = "SELECT t.fee_structure_id AS referenceId,f.fee_name AS name,type FROM  template_structure_mapping t INNER JOIN feestructure f ON t.fee_structure_id=f.fee_structure_id WHERE t.template_id=?";
        JSONObject job = null;
        int count = 0;
        ResultSet rs = DaoUtil.executeQuery(conn, query, new Object[]{id});
        job = jsonUtil.getJsonObject(rs, count, 0, 40);
        return job;
    }

    public Object getTemplatesAsJson(Connection conn,String sessionid, int start, int limit) throws ReadableException {
        JSONObject job = null;
        ResultSet rs = null;
        int count = 0;
        try {
            rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count FROM templates t LEFT JOIN class c ON t.id =c.feetemplate");
            if (rs.next()) {
                count = rs.getInt("count");
            }
            String query="SELECT t.*,c.classid AS classes, c.name AS classname " +
                                            "  FROM templates t LEFT JOIN sessions s ON t.id =s.template_id AND s.session_id=? and t.expire=0 " +
                                            "  LEFT JOIN class c ON c.classid=s.class_id " +
                                            "  LIMIT ? OFFSET ?";
            
            rs = DaoUtil.executeQuery(conn,query,new Object[]{sessionid,limit, start});
            job = jsonUtil.getJsonObject(rs, count, start, limit, false);
            
        } catch (SQLException ex) {
            Logger.getLogger(Property.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public String delTemplate(Connection conn, Templates template) throws ReadableException {
        String query = "delete from templates where id = ?";
        DaoUtil.executeUpdate(conn, query, template.getId());
        return "{success:true}";
    }

    public JSONObject getAllFeeStructure(Connection conn, int start, int limit) throws ReadableException {
        JSONObject job = null;
        int count = 0;
        try {
            ResultSet rs = DaoUtil.executeQuery(conn, "SELECT count(1) as count FROM feestructure ");
            if (rs.next()) {
                count = rs.getInt("count");
            }
            rs = DaoUtil.executeQuery(conn, "SELECT fee_structure_id as id,fee_name as name,header,fee_type as type,fee_amount as amount,fee_frequency as frequency,`comment` FROM feestructure  limit ? offset ?",
                    new Object[]{limit, start});
            job = jsonUtil.getJsonObject(rs, count, start, limit);
        } catch (SQLException ex) {
            Logger.getLogger(Property.class.getName()).log(Level.SEVERE, null, ex);
        }
        return job;
    }

    public FeeStructure addOrEditFeeStructure(Connection conn, FeeStructure fees) throws ReadableException {
        Object[] params = null;
        String uuid = "";
        String query = "insert into feestructure(fee_structure_id,fee_name,header, fee_type, fee_amount, fee_frequency,`comment`) values(?,?,?,?,?,?,?)";
        if (!StringUtil.isNullOrEmpty(fees.getId())) {
            uuid = fees.getId();
            query =sqlQueries.getProperty("UPDATE_FEE_STRUC");
            params = new Object[]{fees.getHeader(),fees.getType(),fees.getAmount(),fees.getFrequency(),fees.getComment(),fees.getId()};
        } else {
            uuid = UUID.randomUUID().toString();
            params = new Object[]{uuid, fees.getName(), fees.getHeader(), fees.getType(), fees.getAmount(), fees.getFrequency(), fees.getComment()};
        }
        DaoUtil.executeUpdate(conn, query, params);
        fees.setId(uuid);
        return fees;
    }

    public String delFeeStructure(Connection conn, FeeStructure fees) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public void addOrEditTemplateDetails(Connection conn, TemplateDetail[] details) throws ReadableException {
        String query = "insert into template_structure_mapping(template_id,fee_structure_id,type) values(?,?,?)";
        for (int i = 0; i < details.length; i++) {
            TemplateDetail obj = details[i];
            DaoUtil.executeUpdate(conn, query, new Object[]{obj.getId(), obj.getReferenceId(), obj.getType()});
        }
    }
}
