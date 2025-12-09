package com.skillforge.backend;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        byte[] key = new byte[64]; // 64 bytes = strong key
        new SecureRandom().nextBytes(key);
        String secret = Base64.getEncoder().encodeToString(key);
        System.out.println("Generated Secret Key:");
        System.out.println(secret);
    }
}
