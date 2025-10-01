package com.udea.Lab012025.service;

import com.udea.Lab012025.DTO.TransactionDTO;
import com.udea.Lab012025.DTO.TransferRequestDTO;
import com.udea.Lab012025.entity.Customer;
import com.udea.Lab012025.entity.Transaction;
import com.udea.Lab012025.repository.CustomerRepository;
import com.udea.Lab012025.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // ✅ Transferir dinero entre cuentas
    public TransactionDTO transferMoney(TransferRequestDTO transferRequest) {
        if (transferRequest.getSenderAccountNumber() == null || transferRequest.getReceiverAccountNumber() == null) {
            throw new IllegalArgumentException("El número de cuenta origen o destino no puede ser nulo");
        }

        // Buscar cliente origen
        Customer sender = customerRepository.findByAccountNumber(transferRequest.getSenderAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("Cuenta origen no encontrada"));

        // Buscar cliente destino
        Customer receiver = customerRepository.findByAccountNumber(transferRequest.getReceiverAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("Cuenta destino no encontrada"));

        // ✅ Validar fondos suficientes
        if (sender.getBalance() < transferRequest.getAmount()) {
            throw new IllegalArgumentException("Fondos insuficientes en la cuenta origen");
        }

        // Actualizar saldos
        sender.setBalance(sender.getBalance() - transferRequest.getAmount());
        receiver.setBalance(receiver.getBalance() + transferRequest.getAmount());

        customerRepository.save(sender);
        customerRepository.save(receiver);

        // Crear y guardar transacción
        Transaction transaction = new Transaction();
        transaction.setSenderAccountNumber(sender.getAccountNumber());
        transaction.setReceiverAccountNumber(receiver.getAccountNumber()); // 👈 antes faltaba
        transaction.setAmount(transferRequest.getAmount());

        transaction = transactionRepository.save(transaction);

        // Retornar DTO
        TransactionDTO savedTransaction = new TransactionDTO();
        savedTransaction.setId(transaction.getId());
        savedTransaction.setSenderAccountNumber(transaction.getSenderAccountNumber());
        savedTransaction.setReceiverAccountNumber(transaction.getReceiverAccountNumber());
        savedTransaction.setAmount(transaction.getAmount());

        return savedTransaction;
    }

    // ✅ Consultar histórico de transacciones por número de cuenta
    public List<TransactionDTO> getTransactionsByAccountNumber(String accountNumber) {
        List<Transaction> transactions = transactionRepository
                .findBySenderAccountNumberOrReceiverAccountNumber(accountNumber, accountNumber);

        return transactions.stream().map(transaction -> {
            TransactionDTO dto = new TransactionDTO();
            dto.setId(transaction.getId());
            dto.setSenderAccountNumber(transaction.getSenderAccountNumber());
            dto.setReceiverAccountNumber(transaction.getReceiverAccountNumber());
            dto.setAmount(transaction.getAmount());
            return dto;
        }).collect(Collectors.toList());
    }
}
