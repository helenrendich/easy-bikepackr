package com.example.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.NoSuchElementException;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Item in Checklist not found.")
public class NoSuchItemException extends NoSuchElementException {
}
