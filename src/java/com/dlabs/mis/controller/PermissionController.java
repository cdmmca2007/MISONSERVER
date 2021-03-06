package com.dlabs.mis.controller;


import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.PermissionDAO;
import com.dlabs.mis.model.PermissionGroup;
import com.dlabs.mis.model.RolesPermission;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author kamlesh the admin
 */
@Controller
public class PermissionController {

    Connection conn;
    private static Map<String,PermissionGroup> accessGroups = null;
    
    @Autowired
    private PermissionDAO permissionDAO;
    
    
    public void setPermissionDAO(PermissionDAO permissionDAO) {
        this.permissionDAO = permissionDAO;

    }    
    public PermissionController() {
        if(accessGroups==null){
            try {
                conn = DbPool.getConnection();
                accessGroups = new PermissionDAO().getAccessGroups(conn);
            } catch (ReadableException ex) {
                Logger.getLogger(PermissionController.class.getName()).log(Level.SEVERE, null, ex);
            } catch (SQLException ex) {
                Logger.getLogger(PermissionController.class.getName()).log(Level.SEVERE, null, ex);
            } finally{
                DbPool.close(conn);
            }
        }
    }
    
     @RequestMapping(value = URLMap.GET_ROLES_GROUP, method = RequestMethod.GET)
    @ResponseBody
    public String getPermissionGroups(@RequestParam("roleId") int roleId) {
        String res="";
        //List<RolePermission> res = null;
        try{
            conn = DbPool.getConnection();
            res = permissionDAO.getPermissionsByRole(conn,roleId).toString();
            conn.commit();
        }catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return res;
    }
     @RequestMapping(value = URLMap.GET_GROUP_PERMISSION, method = RequestMethod.GET)
    @ResponseBody
    public List<PermissionGroup> getAllGroups(){
         List<PermissionGroup> groups =new ArrayList<PermissionGroup>();
         try {
            Set<String> keys =accessGroups.keySet();
            for(String key:keys){
                groups.add(accessGroups.get(key));
            }
        } catch (Exception ex) {
        } 
        return groups;
    } 
     
     
     
    public Map<String,PermissionGroup> getAccessGroups(){
        return accessGroups;
    }
//
//    public List<RolePermission> getRolesPermission(AccessGroup grp){
//        Connection conn = null;
//        List<RolePermission> res = null;
//        try{
//            conn = DbPool.getConnection();
//            PermissionDAO dao = new PermissionDAO();
//            res = dao.getRolesPermissions(conn,grp.getGroupID());
//            conn.commit();
//        }catch(Exception ex){
//            DbPool.rollback(conn);
//        }finally{
//            DbPool.close(conn);
//        }
//        return res;
//
//    }
//     public RolePermission getRolesPermission(int groupID,int roleID){
//        Connection conn = null;
//        RolePermission res = null;
//        try{
//            conn = DbPool.getConnection();
//            PermissionDAO dao = new PermissionDAO();
//            res = dao.getPermissionsByRole(conn,groupID,roleID);
//            conn.commit();
//        }catch(Exception ex){
//            DbPool.rollback(conn);
//        }finally{
//            DbPool.close(conn);
//        }
//        return res;
//
//    }
   @RequestMapping(value = URLMap.UPDATE_PERMISSION, method = RequestMethod.POST)
   @ResponseBody
   public String editPermission(@RequestBody RolesPermission[] rolep){
        String res = "{success:false}";
        try{
            conn = DbPool.getConnection();
            permissionDAO.editPermission(conn,rolep);
            conn.commit();
            res = "{success:true}";
        }catch(Exception ex){
            DbPool.rollback(conn);
        }finally{
            DbPool.close(conn);
        }
        return res;
     }

//     public boolean hasReadPermission(List<RolePermission> rolePermission,int groupID, int featureID){
//        for(int i=0; i <rolePermission.size(); i++){
//            if(rolePermission.get(i).getGroupid()==groupID){
//                int read = rolePermission.get(i).getReadonly();
//                int edit = rolePermission.get(i).getEditable();
//                int fid = (int)Math.pow(2, featureID);
//                if((read & fid)!=0)
//                    return true;
//                if((edit & fid)!=0)
//                    return true;
//            }
//        }
//         return false;
//     }
     //permission/getRoles.do
     //public String 
}
