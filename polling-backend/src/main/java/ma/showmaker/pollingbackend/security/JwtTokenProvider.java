package ma.showmaker.pollingbackend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.xml.crypto.Data;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication){

        UserPrincipal userPrincipal = (ma.showmaker.pollingbackend.security.UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date dateExpired = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(dateExpired)
                .signWith(SignatureAlgorithm.ES512, jwtSecret)
                .compact();
    }

    public Long GetUserIdFromJwt(String authToken){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(authToken)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken){
        try{
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return true;
        }catch (SignatureException ex){
            logger.error("invalid Signature");
        }catch (MalformedJwtException ex){
            logger.error("invalid jwt");
        }catch (ExpiredJwtException ex){
            logger.error("expired jwt");
        }catch (UnsupportedJwtException ex){
            logger.error("Unsupported jwt");
        }catch (IllegalArgumentException ex){
            logger.error("Jwt is empty");
        }
        return false;
    }
}