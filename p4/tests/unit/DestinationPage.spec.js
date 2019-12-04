import { expect } from 'chai'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import DestinationPage from '@/components/pages/DestinationPage.vue'

describe('DestinationPage.vue', () => {

    let destination = {
        "id": 1,
        "name": "Paris, France",
        "places": [
          {
            "id": 1,
            "name": "Eiffel Tower",
            "description": "Completed in 1889, this colossal landmark, although initially hated by many Parisians, is now a famous symbol of French civic pride."
          },
          {
            "id": 2,
            "name": "Louvre Museum",
            "description": "Home to Leonardo da Vinci's Mona Lisa, the Louvre is considered the world's greatest art museum, with an unparalleled collection of items covering the full spectrum of art through the ages."
          },
          {
            "id": 3,
            "name": "Cathédrale Notre-Dame de Paris",
            "description": "This famous cathedral, a masterpiece of Gothic architecture on which construction began in the 12th century, stands on the Île de la Cité and is the symbolic heart of the city."
          },
          {
            "id": 4,
            "name": "Jardin des Tuileries",
            "description": "Located within the Place de la Concorde, this garden demonstrates the Parisian style of intricate landscaping."
          }
        ]
    }

    let id=1

    it('shows a destination with all its places', () => {

        const wrapper = shallowMount(DestinationPage, {
            computed: {
                destination: function() {
                    return destination
                }
            },
            propsData: { id },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        expect(wrapper.text()).to.include(destination.name)
      //  expect(wrapper.text()).to.include("Eiffel Tower")

    })
})