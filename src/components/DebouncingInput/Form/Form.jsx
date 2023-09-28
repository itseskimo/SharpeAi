import './Form.css'
import { useEffect, useState } from 'react'
const Form = () => {


  function faqToggle(id, e) {
    let listField = document.getElementById(`listField${id}`)
    let dropdownField = document.getElementById(`dropdownField${id}`)
    let hideTxtField = document.getElementById(`hideTxtField${id}`)
    let selectText = document.getElementById(`selectText${id}`)
    dropdownField.classList.toggle('dropdown_rotate')
    hideTxtField.classList.toggle('hidden')

    selectText.innerHTML = e.target.innerText

    document.addEventListener('click', event => {
      const isClickInside = listField?.contains(event.target)

      if (!isClickInside) {
        hideTxtField.classList.add('hidden')
        dropdownField.classList.remove('dropdown_rotate')

        // The click was OUTSIDE the specifiedElement, do something
      }
    })

  }

  function handleInputChange(e) {
    setInputField(e.target.value)
  }

  const [inputField, setInputField] = useState('')
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    let timer;

    // Set a timer to update the displayValue after 1500ms (1.5 second)
    timer = setTimeout(() => {
      setDisplayValue(inputField)
    }, 1500)

    // Cleanup: Clear the timer if the inputField changes before the timer expires

    return () => clearTimeout(timer)
  }, [inputField])

  return (


    <div>
      <div className='grid_container'>

        <section className='input_field-container'>

          <main className='dropdown_container' >
            <label className=''>Select Asset</label>

            <section id='listField1' onClick={(e) => faqToggle(1, e)}>

              <section className=''>
                <p id='selectText1'>ETH</p>
                <img src='../i-down-white.svg' className='dropdown_state' alt='dropDown' id='dropdownField1' />
              </section>


              <ul className='hidden' id='hideTxtField1' >
                <li className='' >
                  ETH
                </li>

                <li className='' >
                  BTC
                </li>
              </ul>

            </section>
          </main>

          <div className="borrow_input-container">
            <div>
              <span>Borrow Amount</span>
              <span id='max_amt'>Max Held Amount : {displayValue ? displayValue : 0}</span>
            </div>
            <input type='number' value={inputField} onChange={handleInputChange} />
          </div>

          <div className='inputField_submit_container'>
            <button className='inputField_submit'>Execute</button>

          </div>
        </section>


        <section className='blank_column'>
          <div></div>
          <div></div>
        </section>



      </div>
    </div>
  )
}

export default Form