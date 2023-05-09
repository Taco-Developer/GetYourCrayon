package com.sevenight.coldcrayon.user.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import javax.persistence.EntityManager;

public class UserRepositoryImpl extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public UserRepositoryImpl(EntityManager em) {
        super(User.class);
        this.queryFactory = new JPAQueryFactory(em);
    }
}
