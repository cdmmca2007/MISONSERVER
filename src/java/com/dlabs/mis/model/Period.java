/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dlabs.mis.model;

/**
 *
 * @author cd
 */

public class Period {

      private int id;
      private String periodid;
      private String periodnumber;
      private String starttime;
      private String endtime;
      private String createdby;
      private String schoolid;
      private int    totnoofperiod;
      private long   createdon;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getCreatedon() {
        return createdon;
    }

    public void setCreatedon(long createdon) {
        this.createdon = createdon;
    }

      

    public int getTotnoofperiod() {
        return totnoofperiod;
    }

    public void setTotnoofperiod(int totnoofperiod) {
        this.totnoofperiod = totnoofperiod;
    }     

    public String getSchoolid() {
        return schoolid;
    }

    public void setSchoolid(String schoolid) {
        this.schoolid = schoolid;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getEndtime() {
        return endtime;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
    }

    public String getPeriodid() {
        return periodid;
    }

    public void setPeriodid(String periodid) {
        this.periodid = periodid;
    }

    public String getPeriodnumber() {
        return periodnumber;
    }

    public void setPeriodnumber(String periodnumber) {
        this.periodnumber = periodnumber;
    }

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }


}
