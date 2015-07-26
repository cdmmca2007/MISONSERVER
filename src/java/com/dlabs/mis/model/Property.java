package com.dlabs.mis.model;

import java.util.HashSet;
import java.util.Set;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
/**
 *
 * @author Kamlesh Kumar Sah
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class Property {
    private int id;
    private String value;
    private Set<Master> masters;

    public Property() {
        masters = new HashSet<Master>();
    }

    public Property(int id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value= value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
   
    public Set<Master> getMasters() {
        return masters;
    }
     @JsonIgnore
    public void setMasters(Set<Master> masters) {
        this.masters = masters;
    }
    
    public void addMaster(Master master){
        this.masters.add(master);
    }
    
}
