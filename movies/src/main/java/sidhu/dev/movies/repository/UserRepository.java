package sidhu.dev.movies.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sidhu.dev.movies.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

}