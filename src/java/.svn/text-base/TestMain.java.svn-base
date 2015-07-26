
import com.dlabs.mis.controller.PermissionController;
import com.dlabs.mis.dao.PermissionDAO;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Kamlesh the admin
 */
public class TestMain {
    public static void main(String a[]) throws SQLException, ReadableException{
        Connection conn =null;
        try{
        conn = DbPool.getConnection();
        PermissionController p = new PermissionController();
       // System.out.print(p.getPermissionGroups().toString());
        }catch(Exception ex){
            System.out.print(ex.getMessage());
        }
        finally{
            DbPool.close(conn);
        }
    }
}
