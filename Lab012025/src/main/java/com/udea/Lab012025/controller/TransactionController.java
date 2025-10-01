    package com.udea.Lab012025.controller;

    import com.udea.Lab012025.DTO.TransactionDTO;
    import com.udea.Lab012025.DTO.TransferRequestDTO;
    import com.udea.Lab012025.service.TransactionService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    /**
     * Controlador REST para gestionar transacciones financieras.
     * Proporciona endpoints para transferencias de dinero y consulta de transacciones de un usuario.
     */
    @RestController
    @RequestMapping(value="/api/transactions", produces = "application/json")
    public class TransactionController {

        @Autowired
        private TransactionService transactionService;


        @PostMapping
        public ResponseEntity<?> transferMoney(@RequestBody TransferRequestDTO transferRequestDTO) {
            try {
                TransactionDTO savedTransaction = transactionService.transferMoney(transferRequestDTO);
                return ResponseEntity.ok(savedTransaction);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

        @GetMapping("/{accountNumber}")
        public List<TransactionDTO> getTransactionsByAccount(@PathVariable String accountNumber) {
            return transactionService.getTransactionsByAccountNumber(accountNumber);
        }
    }