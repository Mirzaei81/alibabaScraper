export type Available= {
    result: {
      requestId: string
      bannerId: string
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
export type  basketId= {
    result: {
      basketId: number
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
  
export type Login= {
    result: {
      access_token: string
      refresh_token: string
      expires_in: number
      token_type: string
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
  
export type  Flights= {
    result: {
      hasLabel: boolean
      isCompleted: boolean
      tryLogin: boolean
      departing: Array<{
        otherPackagesForFlight: Array<any>
        proposalId?: string
        origin: string
        destination: string
        airlineCode: string
        flightNumber: string
        leaveDateTime: string
        arrivalDateTime: string
        aircraft: string
        priceChild: number
        priceAdult: number
        priceInfant: number
        description: any
        flightId: string
        class: string
        classType: string
        classTypeName: string
        status: string
        statusName: string
        displayIndex: number
        isCharter: boolean
        isAdditionalServices: boolean
        ticketType?: string
        isSelectableInRoundtrip: boolean
        messageForSelectableInRoundTrip: any
        seat: number
        stars: number
        isRefundable: boolean
        hasConnection: boolean
        uniqueKey: string
        crcn: {
          "از زمان صدور بلیط تا  24 ساعت قبل از پرواز"?: string
          "از 24 ساعت قبل از پرواز  به بعد"?: string
          "از زمان صدور بلیط تا  12:00 ظهر 2 روز قبل از پرواز"?: string
          "از 12:00 ظهر 2 روز قبل از پرواز تا  12:00 ظهر 1 روز قبل از پرواز"?: string
          "از 12:00 ظهر 1 روز قبل از پرواز  به بعد"?: string
          "از زمان صدور بلیط تا  12:00 ظهر 3 روز قبل از پرواز"?: string
          "از 12:00 ظهر 3 روز قبل از پرواز تا  12:00 ظهر 1 روز قبل از پرواز"?: string
          "از 12:00 ظهر 1 روز قبل از پرواز تا  3 ساعت قبل از پرواز"?: string
          "از 3 ساعت قبل از پرواز  به بعد"?: string
        }
        maxAllowedBaggage: number
        terminal: string
        promoted: number
        discount: number
        domesticMarkedUp: boolean
        originalPrice: any
        originalChildPrice: any
        originalInfandPrice: any
        b2BAdultPriceDetail: any
        b2BChildPriceDetail: any
        b2BInfantPriceDetail: any
        commission: number
        appliedRules: Array<any>
        rawCrcn: Array<{
          fromTime?: string
          fromMinutes?: number
          toTime?: string
          toMinutes?: number
          value: number
          type: string
          crcnValueId: number
        }>
        removedByRuleEngine: boolean
        ticketTypeLabel: string
        promotionDetails: Array<any>
        promotionDetail: any
        reissuePriceDetail: any
        freeCancelationPriceDetail?: {
          adultAdditionalPrice: number
          childAdditionalPrice: number
          infantAdditionalPrice: number
        }
        tripInsurancePriceDetail: any
        selectedCrossSell: Array<any>
        hasReissue: boolean
        hasFreeCancelation: boolean
        hasTripInsurance: boolean
        airlineLogo: string
        systemKey: any
        originName: string
        destinationName: string
        airlineName: string
        childDiscount: number
        infantDiscount: number
        additionalPromotionFee: number
        type: string
        vipPromotionId: number
        vipVariant: number
      }>
      returning: Array<any>
      packages: Array<any>
      departingFlightPlanEmptyState: any
      returningFlightPlanEmptyState: any
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
  export type orderId= {
    result: {
      orderId: number
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
  export type  Trains = {
    result: {
      departing: Array<{
        proposalId: number
        from: number
        to: number
        rationCode: number
        trainNumber: number
        wagonName: string
        wagonType: number
        moveDatetime: string
        departureDateTime: string
        seat: number
        cost: number
        fullPrice: number
        isCompartment: boolean
        compartmentCapacity: number
        hasAirCondition: boolean
        hasMedia: boolean
        services: {
          airCondition: boolean
          media: boolean
        }
        timeOfArrival: string
        companyName: string
        serviceType: number
        logoSuffix: string
        hasDiscount: boolean
        isSpecialOffer: boolean
        specialOfferTexts: Array<any>
        isFadakSpecialOffer: boolean
        minPassengerCount: number
        minLimitationMessage: string
        maxPassengerCount: number
        exclusiveCompartmentMaxPassengerCount: number
        maxLimitationMessage: string
        hasFreeFood: boolean
        nonRefundable: boolean
        isCharter: boolean
        wagonClass: string
        hasFoodOffer: boolean
        foodOfferTexts: Array<any>
        axleCode: number
        oldExitDatetime: any
        oldFrom: any
        oldTo: any
        badges: Array<any>
        discountBadge: any
        sortOrder: number
        isFamilyCoupe: boolean
        isTransitCar: boolean
        originName: string
        destinationName: string
        orginCode: string
        originCode: string
        destinationCode: string
        arrivalDateTime: string
        availableType: string
      }>
      returning: Array<any>
      departingPreBuy: any
      isCompleted: boolean
      departRouteRequestId: number
      departingAlternativeRoute: boolean
      returnRouteRequestId: number
      returnAlternativeRoute: boolean
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
  export type  Services= {
    result: {
      data: Array<{
        optionalServiceId: number
        serviceTypeName: string
        showMoney: number
        description: string
      }>
      isCompleted: boolean
    }
    targetUrl: any
    success: boolean
    error: any
    unauthorizedRequest: boolean
    __wrapped: boolean
    __traceId: any
  }
  export type Ticket = {
      type: 'flights'|'train'
      from: string,
      to: string,
      way: string,
      departing: string,
      adult: string,
      isExclusive: string,
      providers: string,
      firstname: string[]|string,
      lastname: string[]|string,
      gender: string[]|string,
      meli: string[]|string,
      day: string[]|string,
      month: string[]|string,
      year: string[]|string,
      service: string[]|string,
      groupType:string[]|string
  }
  export type Service= {
    date: string
    origin: string
    dest: string
    companyName: string
    adaults_count: string
    ticketType: string
  }
export type TrainStoredList = {
  data:TrainStored[]
} 
export type TrainStored = {
  personals:trainPersonal[]|null[]
  proposalId: string|null
  origin: string
  dest: string
  departureDate: string
  companyName: string
}
export type trainPersonal  ={
  serviceId: number
  namePersian: string
  lastNamePersian: string
  birthdate: string
  meli_code: string
  gender: string
  adult: string
  groupType:string
}
export type flightStoredList = {
  data:flightStored[]
}
export type flightStored = {
  proposalId:string
  origin:string,
  dest:string
  departureDate: string,
  personals:personals[]
}
export type personals={
  "flightAgeType": string
  "name": string
  "lastName": string
  "birthdate": string
  "code": string
}