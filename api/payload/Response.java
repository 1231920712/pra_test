package com.amas.api.payload;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response<T> {

  private int status;
  private String message;
  private T data;
  private int pageCount;

  public Response(int status, String message, T data) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.pageCount = 1;
  }

  public Response(int status, String message, T data, int pageCount) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.pageCount = pageCount;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public int getPageCount() {
    return pageCount;
  }

  public void setPageCount(int pageCount) {
    this.pageCount = pageCount;
  }
}
