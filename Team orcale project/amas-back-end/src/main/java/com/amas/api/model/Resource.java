package com.amas.api.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "sys_resource")
public class Resource {
  private long id;
  private String location;
  private String catalogue;
  private String height;
  private String diameter;
  private String plate;
  private String description;
  private String note;
  private String imageUrl;
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
  @Column(name = "location")
  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  @Basic
  @Column(name = "catalogue")
  public String getCatalogue() {
    return catalogue;
  }

  public void setCatalogue(String catalogue) {
    this.catalogue = catalogue;
  }

  @Basic
  @Column(name = "height")
  public String getHeight() { return height; }

  public void setHeight(String height) { this.height = height; }

  @Basic
  @Column(name = "diameter")
  public String getDiameter() { return diameter; }

  public void setDiameter(String diameter) { this.diameter = diameter; }

  @Basic
  @Column(name = "plate")
  public String getPlate() { return plate; }

  public void setPlate(String plate) { this.plate = plate; }

  @Basic
  @Column(name = "note")
  public String getNote() { return note; }

  public void setNote(String note) { this.note = note; }

  @Basic
  @Column(name = "description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Basic
  @Column(name = "image_url")
  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
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
    Resource resource = (Resource) o;
    return id == resource.id && Objects.equals(location, resource.location) && Objects.equals(catalogue, resource.catalogue);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, location, catalogue, height, diameter, description, note, imageUrl);
  }
}
