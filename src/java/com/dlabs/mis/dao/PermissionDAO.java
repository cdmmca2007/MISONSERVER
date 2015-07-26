/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Permission;
import com.dlabs.mis.model.PermissionGroup;
import com.dlabs.mis.model.RolesPermission;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.ExtJsonUtil;
import com.kjava.base.util.JSONUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;


/**
 *
 * @author kamlesh the admin
 */
public class PermissionDAO {

    JSONUtil jsonUtil = new ExtJsonUtil();
    public Map<String, PermissionGroup> getAccessGroups(Connection conn) throws ReadableException {
        Map<String, PermissionGroup> groups = new HashMap<String, PermissionGroup>();
        String query = "SELECT * from accessgroups";
        try {
            ResultSet rs = DaoUtil.executeQuery(conn, query);
            while (rs.next()) {
                String gid = rs.getString("groupid");
                PermissionGroup ag = new PermissionGroup(gid,rs.getInt("no"), rs.getString("title"));
                ResultSet rs1 = DaoUtil.executeQuery(conn, "SELECT * from permissions where groupid = ? order by id", gid);
                while (rs1.next()) {
                    Permission perm = new Permission(rs1.getInt("id"),gid,rs1.getString("name"),rs1.getDate("ts"),rs1.getString("image"),rs1.getString("tooltip"),rs1.getString("callback"));
                    ag.addPermission(perm);
                }
                groups.put(gid, ag);
            }
        } catch (SQLException ex) {
            Logger.getLogger(PermissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return groups;
    }

//    public List<RolePermission> getRolesPermissions(Connection conn, int groupID) throws ReadableException, SQLException {
//        List<RolePermission> list = new ArrayList<RolePermission>();
//        String query = "SELECT * from useraccess where groupid = ?";
//        ResultSet rs = DaoUtil.executeQuery(conn, query, groupID);
//        while (rs.next()) {
//            RolePermission rp = new RolePermission();
//            rp.setGroupid(groupID);
//            rp.setRoleid(rs.getInt("roleid"));
//            rp.setReadonly(rs.getInt("readonly"));
//            rp.setEditable(rs.getInt("editable"));
//            list.add(rp);
//        }
//        return list;
//    }
     public JSONObject getPermissionsByRole(Connection conn, int roleID) throws ReadableException, SQLException {
        String query = "SELECT rg.roleid as roleId, rg.groupid,rg.editable,rg.readonly,a.title FROM rolesgroupspermission rg INNER JOIN roles r ON rg.roleid=r.id "
                + "INNER JOIN accessgroups a ON a.groupid=rg.groupid where rg.roleid = ?";
        ResultSet rs = DaoUtil.executeQuery(conn, query, roleID);
        return jsonUtil.getJsonObject(rs, 100, 1, 100, false);
        
    }
//
//    public RolePermission getPermissionsByRole(Connection conn, int groupID, int roleID) throws ReadableException, SQLException {
//        String query = "SELECT * from useraccess where groupid=? and roleid = ?";
//        ResultSet rs = DaoUtil.executeQuery(conn, query, new Object[]{groupID, roleID});
//        RolePermission rp = new RolePermission();
//        if (rs.next()) {
//            rp.setGroupid(groupID);
//            rp.setRoleid(roleID);
//            rp.setReadonly(rs.getInt("readonly"));
//            rp.setEditable(rs.getInt("editable"));
//        }
//        return rp;
//    }
//
    public void editPermission(Connection conn, RolesPermission[] obj) throws ReadableException {
        for (int i = 0; i < obj.length; i++) {
            String query = "UPDATE rolesgroupspermission set editable = ?,readonly = ? where groupid = ? and roleid = ?";
            DaoUtil.executeUpdate(conn, query, new Object[]{obj[i].getEditable(), obj[i].getReadonly(), obj[i].getGroupid(), obj[i].getRoleId()});
        }
    }
}
