export const setCarriagePrice = (prices, distance, formData, additional_points_quantity) => {

    let price

    if (!formData.type.value) {
        let step = prices.find(el => el.range > distance / 1000 && !el.type)
        if (step.min_cost) {
            price = step.min_cost
        } else {
            price = step.price * distance / 1000
        }
        if (formData.thermo_bag) {
            price = price * step.thermo_bag_markup
        }

        price = Math.round(price)
    }

    if (formData.type.value) {

        let step

        if (!formData.load_capacity.value) {
            step = prices.find(el => el.range > distance / 1000 && el.type === formData.type.value)
        } else {
            step = prices.find(el => el.range > distance / 1000 && el.type === formData.type.value && el.load_capacity === formData.load_capacity.value)
        }

        // !possible!? break!

        if (step.min_cost) {
            price = step.min_cost
        } else {
            price = step.price * distance / 1000
        }
        if (formData.thermo_bag) {
            price = price * step.thermo_bag_markup
        }
        if (formData.thermo_van) {
            price = price * step.thermo_van_markup
        }
        if (formData.refrigirator_plus || formData.refrigirator_minus) {
            price = price * step.ref_markup
        }

        price = Math.round(price)

    }

    return price
}
