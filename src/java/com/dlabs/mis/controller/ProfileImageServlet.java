package com.dlabs.mis.controller;

import com.kjava.base.util.ConfigReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ProfileImageServlet extends HttpServlet {

	private static final long serialVersionUID = 5547424986127665441L;
	public  String ImgBasePath = "images/store/";
	private static final String defaultImgPath = "resources/images/defaultuser.png";

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// Get the absolute path of the image
		ServletContext sc = getServletContext();
		String uri = req.getRequestURI();
		String servletBase = req.getServletPath();
		String requestedFileName = uri.substring(uri.lastIndexOf(servletBase)
				+ servletBase.length());
		String fileName = null;
                ImgBasePath = new ConfigReader().get("prof_pic_store");
                System.out.print(requestedFileName);
		try {
                        if(requestedFileName!=null)
			fileName =  ImgBasePath + requestedFileName;
                        else
                        fileName =  defaultImgPath;    
		} catch (Exception e) {
			fileName = sc.getRealPath(uri.substring(uri
					.lastIndexOf(servletBase)));
		}
		// Get the MIME type of the image
		String mimeType = sc.getMimeType(fileName);
		/*if (mimeType == null) {
			sc.log("Could not get MIME type of " + fileName);
			resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}*/

		// Set content type
		resp.setContentType(mimeType);

		// Set content size
		File file = new File(fileName);
		if (!file.exists()) {
                        if(fileName.contains("_100.")){
                            //file = new File(fileName.replaceAll("_100.", "."));
                            file = new File(fileName);
                        }    
                        if(!file.exists()) {
                            file = new File(sc.getRealPath(defaultImgPath));
                        }
		}
                
		resp.setContentLength((int) file.length());

		// Open the file and output streams
		FileInputStream in = new FileInputStream(file);
		OutputStream out = resp.getOutputStream();

		// Copy the contents of the file to the output stream
		byte[] buf = new byte[4096];
		int count = 0;
		while ((count = in.read(buf)) >= 0) {
			out.write(buf, 0, count);
		}
		in.close();
		out.close();
	}
}
