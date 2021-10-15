package com.amas.api.controller;

import com.amas.api.exception.ResourceNotFoundException;
import com.amas.api.model.Resource;
import com.amas.api.payload.Response;
import com.amas.api.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ResourceController {

  @Autowired
  private ResourceRepository resourceRepository;

  /**
   * Get all resources list.
   *
   * @return the list
   */
  @GetMapping("/resources")
  public Response<List<Resource>> getAllResources(@RequestParam(defaultValue = "0") Integer pageNo,
                                                  @RequestParam(defaultValue = "15") Integer pageSize,
                                                  @RequestParam(defaultValue = "id") String sortBy) {
//    Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
//    Page<Resource> pagedResult = resourceRepository.findAll(paging);
//
//    if(pagedResult.hasContent()) {
//      return new Response(HttpStatus.OK.value(), "success", pagedResult.getContent(), pagedResult.getTotalPages());
//    } else {
//      return new Response(HttpStatus.OK.value(), "success", resourceRepository.findAll());
//    }
    return new Response(HttpStatus.OK.value(), "success", resourceRepository.findAll());
  }

  /**
   * Create new resource.
   *
   * @param resource the resource
   * @return the resource
   */
  @PostMapping("/resources")
  public Response<Resource> createResource(@RequestBody Resource resource) {
    Resource newResource = resourceRepository.save(resource);
    return new Response(HttpStatus.OK.value(), "success", newResource);
  }

  /**
   * Gets resource by id.
   *
   * @param id the resource id
   * @return the resource by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/resources/{id}")
  public Response<Resource> getResourceById(@PathVariable(value = "id") Long id)
          throws ResourceNotFoundException {
    Resource resource =
            resourceRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Resource not found : " + id));
    return new Response(HttpStatus.OK.value(), "success", resource);
  }

  /**
   * Update resource.
   *
   * @param id the id
   * @param details the resource details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/resources/{id}")
  public Response<Resource> updateResource(
          @PathVariable(value = "id") Long id, @RequestBody Resource details)
          throws ResourceNotFoundException {

    Resource obj =
            resourceRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Resource not found on :: " + id));

    obj.setLocation(details.getLocation());
    obj.setCatalogue(details.getCatalogue());
    obj.setHeight(details.getHeight());
    obj.setDiameter(details.getDiameter());
    obj.setPlate(details.getPlate());
    obj.setNote(details.getNote());
    obj.setDescription(details.getDescription());
    obj.setImageUrl(details.getImageUrl());
    final Resource updatedObj = resourceRepository.save(obj);
    return new Response(HttpStatus.OK.value(), "success", updatedObj);
  }

  /**
   * Delete resource.
   *
   * @param id the resource id
   * @return the map
   * @throws Exception the exception
   */
  @DeleteMapping("/resources/{id}")
  public Response<String> deleteResource(@PathVariable(value = "id") Long id) throws Exception {
    Resource obj =
            resourceRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Resource not found on :: " + id));

    resourceRepository.delete(obj);
    return new Response<>(HttpStatus.OK.value(), "success", "Resource is deleted");
  }
}
