package com.sevenight.coldcrayon.game.service;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

@Service
public class SaveImageServiceImpl {

    public void downloadImage(String imageUrl, String destinationPath) throws IOException {
        String prefix = "/getchacrayon/image/history";
        destinationPath = prefix + destinationPath;
        System.err.println(imageUrl);
        System.err.println(destinationPath);
        URL url = new URL(imageUrl);
        FileOutputStream outputStream = new FileOutputStream(destinationPath);
        IOUtils.copy(url.openStream(), outputStream);
        outputStream.close();
    }

}
