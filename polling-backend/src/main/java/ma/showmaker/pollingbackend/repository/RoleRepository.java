package ma.showmaker.pollingbackend.repository;

import ma.showmaker.pollingbackend.model.Role;
import ma.showmaker.pollingbackend.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName rolename);
}
