package com.dlabs.mis.dao;

import com.dlabs.mis.model.AuditTrail;
import com.dlabs.util.Paging;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh Kumar Sah
 */
@Repository
public class AuditTrailDAO {

    public JSONObject getAll(Connection conn, Paging page)throws ReadableException {
        try {
            String[] query = MySqlQuery.getAuditTrailQuery(page.getSearchString(),"ts desc");
            ResultSet rs = DaoUtil.executeQuery(conn, query[0]);
            int count = 0;
            if (rs.next()) {
                count = rs.getInt("count");
            }
            int offset = page.getStart();
            rs = DaoUtil.executeQuery(conn, query[1]+" limit ? offset ?",new Object[]{page.getLimit(),offset});
            JSONObject jobj = new JSONObject();
            JSONArray jArray = new JSONArray();
            while(rs.next()) {
                JSONObject j = new JSONObject();
                j.put("ts", rs.getLong("ts"));
                j.put("actionby", rs.getString("actionby"));
                j.put("ipaddr", rs.getString("ipaddr"));
                j.put("details", String.format(rs.getString("actiontype"), rs.getString("params")));
                jArray.add(j);
        }
        jobj.put("rows", jArray);
        jobj.put("totalCount", count);
        return jobj;
        } catch (SQLException ex) {
            throw new ReadableException(ex,ex.getMessage(),AuditTrailDAO.class,"getAll");
        }
    }

    public int add(Connection conn, AuditTrail obj) throws ReadableException {
         return DaoUtil.executeUpdate(conn, MySqlQuery.addAudtitTrail(), new Object[]{obj.getActionID(), obj.getParams(), obj.getIpaddress(), obj.getUserid(),obj.getTimestamp()});
    }
}
