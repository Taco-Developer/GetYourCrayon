package com.sevenight.coldcrayon.game.service;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
       
@Service
public class SaveImageServiceImpl {

    @Value("${java.file.homeUrl}")
    String HomeUrl;
 
    public String downloadImage(String imageUrl, String destinationPath, Long idx) throws IOException {
        String prefix = "/getchacrayon/image/history/";
        destinationPath = prefix + destinationPath;
        System.err.println(imageUrl);
        System.err.println(destinationPath);

        File file = new File(destinationPath);
        if (!file.exists()) {
            file.mkdirs(); // 디렉토리가 없으면 해당 경로의 모든 디렉토리를 생성합니다.
        }

        URL url = new URL(imageUrl);
        FileOutputStream outputStream = new FileOutputStream(destinationPath + "/" +idx + ".jpg");
        IOUtils.copy(url.openStream(), outputStream);
        outputStream.close();
        return HomeUrl + destinationPath + "/" +idx + ".jpg";
    }
}
