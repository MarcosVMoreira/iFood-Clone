package com.ifood.merchant.endpoint.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@NoArgsConstructor
public class DistanceMatrixResponse {

    @JsonProperty("destination_addresses")
    private List<String> destinationAddresses;

    @JsonProperty("origin_addresses")
    private List<String> originAddresses;

    private List<DistanceMatrixRow> rows;

    private String status;
}