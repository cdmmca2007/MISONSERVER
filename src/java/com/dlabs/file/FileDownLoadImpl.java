package com.dlabs.file;

import com.dlabs.util.FileDownLoadHandler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Kamlesh Kumar Sah
 */
public class FileDownLoadImpl implements FileDownLoadHandler{
    private String filePath,fileName,extension;
    public FileDownLoadImpl() {
    }

    public String getExtension() {
        return extension;
    }

    public void fileDownLoad(HttpServletRequest request, HttpServletResponse response) {
        filePath="F:\\kamlesh";
        fileName="android_JSON_URL";
        extension="txt";
    }

    public String getFileName() {
        return fileName;
    }

    public String getFilePath() {
        return filePath;
    }

}
