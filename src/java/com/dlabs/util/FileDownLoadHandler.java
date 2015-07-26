package com.dlabs.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Kamlesh Kumar Sah
 */
public interface FileDownLoadHandler {

    public String getExtension();
    void fileDownLoad(HttpServletRequest request, HttpServletResponse response);
    String getFileName();
    String getFilePath();
}
