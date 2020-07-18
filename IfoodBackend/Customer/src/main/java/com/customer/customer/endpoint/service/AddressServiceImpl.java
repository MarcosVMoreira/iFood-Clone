package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.model.DTO.AddressDTO;
import com.customer.customer.endpoint.model.entity.Address;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.model.mapper.AddressMapper;
import com.customer.customer.endpoint.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    public AddressServiceImpl (AddressMapper addressMapper, AddressRepository addressRepository) {
        this.addressMapper = addressMapper;
        this.addressRepository = addressRepository;
    }

    @Override
    public List<AddressDTO> listAll () {
        return addressRepository.findAll()
                .stream()
                .map(addressMapper::addressToAddressDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AddressDTO getAddressById (String id) {
        return addressMapper.addressToAddressDTO(addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found for given ID: "+id)));
    }

    @Override
    public List<AddressDTO> getAddressByCustomerID (String id) {
        return addressRepository.findByidCustomer(id)
                .stream()
                .map(addressMapper::addressToAddressDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AddressDTO save(@Valid AddressDTO addressDTO) {
        Address address = addressMapper.addressDTOToAddress(addressDTO);

        return addressMapper.addressToAddressDTO(addressRepository.save(address));
    }

    @Override
    public void delete (String id) {
        verifyIfAddressExist(id);
        addressRepository.deleteById(id);
    }

    @Override
    public AddressDTO update (AddressDTO addressDTO) {
        Address address = addressMapper.addressDTOToAddress(addressDTO);
        verifyIfAddressExist(address.getId());
        return addressMapper.addressToAddressDTO(addressRepository.save(address));
    }

    @Override
    public void verifyIfAddressExist (String id) {
        if (!addressRepository.findById(id).isPresent()) {
            throw new ResourceNotFoundException("Address not found for ID: " + id);
        }
    }

}
