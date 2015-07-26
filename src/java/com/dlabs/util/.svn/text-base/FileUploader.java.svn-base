package com.dlabs.util;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.commons.fileupload.FileItem;

/**
 *
 * @author Kamlesh Kumar Sah
 */
public class FileUploader {

    protected Map parameters = new HashMap();
    protected boolean isUploaded = false;
    protected String Ext;
    protected String contentType;
    protected String fileName;
    protected long size;

    public void uploadFile(List fileItems, String filename,String destinationDirectory) {
        File destDir = new File(destinationDirectory);
        Ext = "";
        if (!destDir.exists()) {
            destDir.mkdirs();
        }
        for (Iterator i = fileItems.iterator(); i.hasNext();) {
            FileItem item = (FileItem) i.next();
            if (!item.isFormField()) {
                try {
                    contentType = item.getContentType();
                    size = item.getSize();
                    fileName = new String(item.getName().getBytes(), "UTF8");
                    fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
                    if (fileName.contains(".")) {
                        Ext = fileName.substring(fileName.lastIndexOf("."));
                    }
                    if (item.getSize() != 0) {
                        File uploadFile = new File(destinationDirectory, filename + Ext);
                        item.write(uploadFile);
                        this.isUploaded = true;
                    }
                } catch (Exception e) {
                    System.out.print("FileUploader.uploadFile");
                }
            }
        }
    }

    public boolean isUploaded() {
        return isUploaded;
    }

    public String getExt() {
        return Ext;
    }

    public String getFileName() {
        return fileName;
    }

    public long getFileSize() {
        return size;
    }

    public String getContentType() {
        return contentType;
    }
}
