package com.udea.Lab012025.controller;

import com.udea.Lab012025.DTO.CustomerDTO;
import com.udea.Lab012025.DTO.TransactionDTO;
import com.udea.Lab012025.DTO.TransferRequestDTO;
import com.udea.Lab012025.service.CustomerService;
import com.udea.Lab012025.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final TransactionService transactionService;

    public CustomerController(CustomerService customerService, TransactionService transactionService) {
        this.customerService = customerService;
        this.transactionService = transactionService;
    }

    // ✅ Obtener todos los clientes
    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // ✅ Obtener un cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    // ✅ Crear un nuevo cliente
    @PostMapping
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
        if (customerDTO.getBalance() == null) {
            throw new IllegalArgumentException("El saldo (balance) no puede ser nulo");
        }
        return ResponseEntity.ok(customerService.createCustomer(customerDTO));
    }

    // ✅ Transferir dinero entre cuentas
    @PostMapping("/transfer")
    public ResponseEntity<TransactionDTO> transferMoney(@RequestBody TransferRequestDTO transferRequest) {
        TransactionDTO transaction = transactionService.transferMoney(transferRequest);
        return ResponseEntity.ok(transaction);
    }

    // ✅ Consultar histórico de transacciones por número de cuenta
    @GetMapping("/{accountNumber}/transactions")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByAccountNumber(@PathVariable String accountNumber) {
        List<TransactionDTO> transactions = transactionService.getTransactionsByAccountNumber(accountNumber);
        return ResponseEntity.ok(transactions);
    }
}
