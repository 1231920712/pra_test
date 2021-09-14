package com.amas.api.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "sys_user")
@EntityListeners(AuditingEntityListener.class)
public class User {

  private long id;
  private String username;
  private String name;
  private String password;
  private Date gmtCreate;
  private Date gmtUpdate;

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.AUTO, generator="native")
  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  @Basic
  @Column(name = "username")
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  @Basic
  @Column(name = "name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Basic
  @Column(name = "password")
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "gmt_create")
  public Date getGmtCreate() {
    return gmtCreate;
  }

  public void setGmtCreate(Date gmtCreate) {
    this.gmtCreate = gmtCreate;
  }

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "gmt_update")
  public Date getGmtUpdate() {
    return gmtUpdate;
  }

  public void setGmtUpdate(Date gmtUpdate) {
    this.gmtUpdate = gmtUpdate;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User that = (User) o;
    return id == that.id && Objects.equals(username, that.username) && Objects.equals(name, that.name) && Objects.equals(password, that.password) && Objects.equals(gmtCreate, that.gmtCreate) && Objects.equals(gmtUpdate, that.gmtUpdate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, username, name, password, gmtCreate, gmtUpdate);
  }
}