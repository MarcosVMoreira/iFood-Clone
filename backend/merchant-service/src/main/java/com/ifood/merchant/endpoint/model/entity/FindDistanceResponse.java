package com.ifood.merchant.endpoint.model.entity;

import com.ifood.merchant.endpoint.enumeration.MerchantTypeEnum;

import com.ifood.merchant.endpoint.enumeration.MerchantTypeEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Data
@Document
@AllArgsConstructor
@Builder
public class FindDistanceResponse {

    private String merchantId;

    private String name;

    private String logo;

    private Float distance;

    private Float duration;

    private Float fee;

    private Float rate;

    private List<MerchantTypeEnum> type;
}