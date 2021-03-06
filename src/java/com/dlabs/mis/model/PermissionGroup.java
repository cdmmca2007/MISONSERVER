/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Kamlesh the admin
 */
public class PermissionGroup {
    private String groupId;
    private int no;
    private String title;
    List<Permission> permissions = new ArrayList<Permission>();
    public PermissionGroup() {
    }

    public PermissionGroup(String groupId, int no, String title) {
        this.groupId = groupId;
        this.no = no;
        this.title = title;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permission) {
        this.permissions = permission;
    }
    public void addPermission(Permission permission){
        this.permissions.add(permission);
    }
    
}
