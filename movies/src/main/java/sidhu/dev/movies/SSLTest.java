package sidhu.dev.movies;

import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class SSLTest {
    public static void main(String[] args) {
        try {
            // Create SSL context and trust manager
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{new X509TrustManager() {
                public X509Certificate[] getAcceptedIssuers() { return null; }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                public void checkServerTrusted(X509Certificate[] certs, String authType) {}
            }}, null);

            SSLSocketFactory factory = sslContext.getSocketFactory();
            SSLSocket sslSocket = (SSLSocket) factory.createSocket("smtp.gmail.com", 465);
            sslSocket.startHandshake();
            System.out.println("SSL Handshake Successful");

            OutputStream os = sslSocket.getOutputStream();
            PrintWriter writer = new PrintWriter(os, true);
            BufferedReader reader = new BufferedReader(new InputStreamReader(sslSocket.getInputStream()));

            // Send EHLO command
            writer.println("EHLO smtp.gmail.com");
            writer.flush();
            readServerResponse(reader);

            // Send AUTH LOGIN command
            writer.println("AUTH LOGIN");
            writer.flush();
            readServerResponse(reader);

            // Send Base64 encoded username
            writer.println("base64_encoded_username"); // Replace with actual Base64 encoded username
            writer.flush();
            readServerResponse(reader);

            // Send Base64 encoded password
            writer.println("base64_encoded_password"); // Replace with actual Base64 encoded password
            writer.flush();
            readServerResponse(reader);

            // Send MAIL FROM command
            writer.println("MAIL FROM:<your-email@gmail.com>");
            writer.flush();
            readServerResponse(reader);

            // Send RCPT TO command
            writer.println("RCPT TO:<recipient@example.com>");
            writer.flush();
            readServerResponse(reader);

            // Send DATA command
            writer.println("DATA");
            writer.flush();
            readServerResponse(reader);

            // Send email data
            writer.println("Subject: Test Email");
            writer.println();
            writer.println("This is a test email.");
            writer.println(".");
            writer.flush();
            readServerResponse(reader);

            // Send QUIT command
            writer.println("QUIT");
            writer.flush();
            readServerResponse(reader);

            sslSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void readServerResponse(BufferedReader reader) throws Exception {
        String response;
        while ((response = reader.readLine()) != null) {
            System.out.println(response);
            if (response.startsWith("250") || response.startsWith("354") || response.startsWith("221")) {
                break;
            }
        }
    }
}



