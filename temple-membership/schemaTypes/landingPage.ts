export default {
    name: 'landing_page_content',
    title: 'Landing Page Content',
    type: 'document',
    fields: [
        {
            name: 'header_section',
            title: 'Header Section',
            type: 'document',
            fields: [
                {
                    name: 'header_name',
                    title: 'Header Name',
                    type: 'string'
                },
                {
                    name: 'navbar_links',
                    title: 'Navbar Links',
                    type: 'array',
                    of: [{
                        name: 'link_details',
                        title: 'Link Details',
                        type: 'object',
                        fields: [
                            {
                                name: 'link_label',
                                title: 'Link Label',
                                type: 'string'
                            },
                            {
                                name: 'link_value',
                                title: 'Link value',
                                type: 'string'
                            }
                        ]
                    }
                    ]
                },
            ]
        },
        {
            name: 'hero_section',
            title: 'Hero Section',
            type: 'document',
            fields: [
                {
                    name: 'welcome_text',
                    title: 'Welcome Text',
                    type: 'string'
                },
                {
                    name: 'temple_name',
                    title: 'Temple Name',
                    type: 'string'
                },
                {
                    name: 'timings_text',
                    title: 'Timings Text',
                    type: 'string'
                },
                {
                    name: 'timings_value_from',
                    title: 'Timings Value From',
                    type: 'string'
                },
                {
                    name: 'timings_value_to',
                    title: 'Timings Value To',
                    type: 'string'
                },
                {
                    name: 'hero_section_image',
                    title: 'Hero Section Image',
                    type: 'image',
                    options: {
                        hotpost: true
                    }
                }
            ]
        },
        {
            name: 'middle_row_section',
            title: 'Middle Row Section',
            type: 'document',
            fields: [
                {
                    name: 'enroll_now_text',
                    title: 'Enroll Now Text',
                    type: 'string'
                },
                {
                    name: 'abhisekam_text',
                    title: 'Abhisekam Text',
                    type: 'string'
                }
            ]
        },
        {
            name: 'about_us_section',
            title: 'About Us Section',
            type: 'document',
            fields: [
                {
                    name: 'section_title_1',
                    title: 'Section Title 1',
                    type: 'string'
                },
                {
                    name: 'section_title_2',
                    title: 'Section Title 2',
                    type: 'string'
                },
                {
                    name: 'section_para_1',
                    title: 'Section Para 1',
                    type: 'string'
                },
                {
                    name: 'section_para_2',
                    title: 'Section Para 2',
                    type: 'string'
                },
                {
                    name: 'about_section_image',
                    title: 'About section image',
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ]
        },
        {
            name: 'pricing_section',
            title: 'Pricing Section',
            type: 'array',
            of: [
                {
                    name: 'pricing_details',
                    title: 'Pricing Details',
                    type: 'object',
                    fields: [
                        {
                            name: 'scheme_title',
                            title: 'Scheme Title',
                            type: 'string'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'string'
                        },
                        {
                            name: 'benefits',
                            title: 'Benefits',
                            type: 'array',
                            of: [{
                                name: 'benefits_details',
                                title: 'Benefits Details',
                                type: 'object',
                                fields: [
                                    {
                                        name: 'benefit_label',
                                        title: 'Benefit Label',
                                        type: 'string'
                                    },
                                    {
                                        name: 'benefit_description',
                                        title: 'Benefit Description',
                                        type: 'string'
                                    }
                                ]
                            }
                            ]
                        }
                    ]

                }
            ]
        },
        {
            name: 'enroll_now_section',
            title: 'Enroll Now Section',
            type: 'document',
            fields: [
                {
                    name: 'text_first_line',
                    title: 'Text First Line',
                    type: 'string'
                },
                {
                    name: 'text_second_line',
                    title: 'Text Second Line',
                    type: 'string'
                },
                {
                    name: 'text_third_line',
                    title: 'Text Third Line',
                    type: 'string'
                }
            ]
        },
        {
            name: 'footer_section',
            title: "Footer Section",
            type: 'document',
            fields: [
                {
                    name: 'temple_name',
                    title: 'Temple Name',
                    type: 'string'
                },
                {
                    name: 'contact_us_details',
                    title: 'Contact Us Details',
                    type: 'document',
                    fields: [
                        {
                            name: 'call_us_label',
                            title: 'Call us Label',
                            type: 'string'
                        },
                        {
                            name: 'call_us_value',
                            title: 'Call Us Value',
                            type: 'string'
                        },
                        {
                            name: 'mail_us_label',
                            title: 'Mail Us Label',
                            type: 'string'
                        },
                        {
                            name: 'mail_us_value',
                            title: 'Mail Us Value',
                            type: 'string'
                        },
                        {
                            name: 'location_label',
                            title: 'Location Label',
                            type: 'string'
                        },
                        {
                            name: 'location_value',
                            title: 'Location Value',
                            type: 'string'
                        }
                    ]
                },
                {
                    name: 'navbar_links',
                    title: 'Navbar Links',
                    type: 'array',
                    of: [{
                        name: 'link_details',
                        title: 'Link Details',
                        type: 'object',
                        fields: [
                            {
                                name: 'link_label',
                                title: 'Link Label',
                                type: 'string'
                            },
                            {
                                name: 'link_value',
                                title: 'Link value',
                                type: 'string'
                            }
                        ]
                    }
                    ]
                },
                {
                    name: 'copyright_text',
                    title: 'Copyright Text',
                    type: 'string'
                }
            ]
        },
        {
            name: 'gallery_section',
            title: 'Gallery Section',
            type: 'document',
            fields: [{
                name: 'gallery_images',
                title: 'Gallery Images',
                type: 'array',
                of: [{
                    name: 'gallery_image',
                    title: 'Gallery Image',
                    type: 'image',
                    options: {
                        hotpost: true
                    }
                }]
            }]
        }
    ]
}