package narzedzia;

import java.util.ResourceBundle;

public class config {
    private static final String resourceBundle = "props/config";

    public static ResourceBundle getResourceBundle() {
        return ResourceBundle.getBundle(resourceBundle);
    }
}
