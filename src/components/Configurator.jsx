import { useState } from 'react';
import ProductBox from './ProductBox.jsx';

const Configurator = () => {
  const [app, setApp] = useState('');
  const [options, setOptions] = useState({});
  const [product, setProduct] = useState(null);

  const handleAppClick = (type) => {
    setApp(type);
    setOptions({});
    setProduct(null);
  };

  const handleOptionChange = (key, value) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);

    if (Object.keys(newOptions).length >= 3) {
      const result = computeProduct(app, newOptions);
      setProduct(result);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* SINISTRA: Application + Options */}
      <div className="col-span-12 lg:col-span-7 space-y-6">
        {/* Applicazioni */}
        <div className="grid grid-cols-4 gap-2 bg-[#f9f8f8] rounded-2xl p-3">
          <h2 className="col-span-4 text-2xl">Choose your application</h2>
          {[
            { key: 'coffee', label: 'Coffee' },
            { key: 'espresso', label: 'Espresso' },
            { key: 'coldbrew', label: 'Cold brew machine' },
            { key: 'water', label: 'Water machine' },
            { key: 'hotwater', label: 'Hot water dispensing' },
            { key: 'ice', label: 'Ice' },
            { key: 'steam', label: 'Steam oven' },
            { key: 'warewasher', label: 'Warewasher' },
          ].map((item) => (
            <div key={item.key} className="col-span-2">
              <button
                onClick={() => handleAppClick(item.key)}
                className={`px-4 py-2 w-full rounded-full text-sm text-left inset-shadow-sm border-sm 
                  ${app === item.key ? 'bg-[#0C3471] text-white' : 'bg-white text-[#a2a2a2] hover:bg-[#0C3471] hover:text-white'}`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>

        {/* Opzioni */}
        {app && (
          <div className="grid grid-cols-4 gap-4 bg-[#f9f8f8] rounded-2xl p-6">
            <h2 className="col-span-4 text-2xl">Choose your options</h2>

            <h3 className="col-span-4 text-xl">Type of coffee brewer?</h3>
            <div className="col-span-2">
              <button
                onClick={() => handleOptionChange('type', 'filtered')}
                className={`px-4 py-2 w-full rounded-full text-sm text-left inset-shadow-sm border-sm 
                  ${options.type === 'filtered' ? 'bg-[#0C3471] text-white' : 'bg-white text-[#a2a2a2] hover:bg-[#0C3471] hover:text-white'}`}
              >
                Filtered coffee
              </button>
            </div>
            <div className="col-span-2">
              <button
                onClick={() => handleOptionChange('type', 'auto')}
                className={`px-4 py-2 w-full rounded-full text-sm text-left inset-shadow-sm border-sm 
                  ${options.type === 'auto' ? 'bg-[#0C3471] text-white' : 'bg-white text-[#a2a2a2] hover:bg-[#0C3471] hover:text-white'}`}
              >
                Full automatic machine
              </button>
            </div>

            <h3 className="col-span-4 text-xl">Total hardness?</h3>
            <div className="col-span-4 flex rounded-full bg-white overflow-hidden font-medium text-center text-[#a2a2a2] text-sm inset-shadow-sm border-sm">
              {[
                { id: 'low', label: '<10° dH', value: '<10' },
                { id: 'medium', label: '10–14° dH', value: '10-14' },
                { id: 'high', label: '>14° dH', value: '>14' },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex-1 py-2 cursor-pointer ${
                    options.hardness === item.value ? 'bg-[#0C3471] text-white' : 'hover:bg-[#0C3471] hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="hardness"
                    value={item.value}
                    className="sr-only"
                    onChange={() => handleOptionChange('hardness', item.value)}
                    checked={options.hardness === item.value}
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <h3 className="col-span-4 text-xl">Coffee brewed / day?</h3>
            <div className="col-span-4 flex rounded-full bg-white overflow-hidden font-medium text-center text-[#a2a2a2] text-sm inset-shadow-sm border-sm">
              {[
                { id: 'vol5', label: '5 liters', value: '5' },
                { id: 'vol10', label: '10 liters', value: '10' },
                { id: 'volHigh', label: '>10 liters', value: '>10' },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex-1 py-2 cursor-pointer ${
                    options.volume === item.value ? 'bg-[#0C3471] text-white' : 'hover:bg-[#0C3471] hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="volume"
                    value={item.value}
                    className="sr-only"
                    onChange={() => handleOptionChange('volume', item.value)}
                    checked={options.volume === item.value}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DESTRA: Prodotto consigliato */}
      <div className="col-span-12 lg:col-span-5">
        <ProductBox product={product} />
      </div>
    </div>
  );
};

// Logica esempio
function computeProduct(app, opts) {
  if (app === 'coffee' && opts.type === 'filtered' && opts.volume === '5') {
    return { name: 'Everpure Coffee Filter A' };
  } else if (opts.volume === '>10') {
    return { name: 'Everpure Max Volume Pro' };
  }
  return { name: 'Standard Everpure Filter' };
}

export default Configurator;
