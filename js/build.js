/**
 * Name: Jake Greer
 * Email: jakegreer11@gmail.com
 * Date: 9/18/2019
 * Project: Responsive Tabs
 * Description: Browser compatible, responsive, pure javascript, user interface tabs component that converts to an accordion in mobile.
 */


/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {

    constructor() {
        this.tabs = [
            {
                hasHeader: false,
                linkText: 'Fit Guide',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nibh arcu, ultricies nec purus quis, consequat luctus orci. Sed non mi nisi. Donec vulputate erat odio, eget lacinia lectus accumsan sed. Phasellus diam lorem, ullamcorper quis velit a, ultricies facilisis turpis. Sed laoreet efficitur odio, ut consequat arcu iaculis non. Quisque lectus ligula, venenatis quis ullamcorper vitae, euismod in nisi. Sed sed arcu tortor. Phasellus a iaculis metus, sed suscipit dui. Nunc mollis, ipsum at tristique dignissim, enim mi sodales nulla, sed dapibus lorem tortor et nisi.',
                active: true
            },
            {
                hasHeader: false,
                linkText: 'Care',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nibh arcu, ultricies nec purus quis, consequat luctus orci. Sed non mi nisi. Donec vulputate erat odio, eget lacinia lectus accumsan sed. Phasellus diam lorem, ullamcorper quis velit a, ultricies facilisis turpis. Sed laoreet efficitur odio, ut consequat arcu iaculis non. Quisque lectus ligula, venenatis quis ullamcorper vitae, euismod in nisi. Sed sed arcu tortor. Phasellus a iaculis metus, sed suscipit dui. Nunc mollis, ipsum at tristique dignissim, enim mi sodales nulla, sed dapibus lorem tortor et nisi.',
                active: false
            },
            {
                hasHeader: true,
                linkText: 'Materials',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nibh arcu, ultricies nec purus quis, consequat luctus orci. Sed non mi nisi. Donec vulputate erat odio, eget lacinia lectus accumsan sed. Phasellus diam lorem, ullamcorper quis velit a, ultricies facilisis turpis. Sed laoreet efficitur odio, ut consequat arcu iaculis non. Quisque lectus ligula, venenatis quis ullamcorper vitae, euismod in nisi. Sed sed arcu tortor. Phasellus a iaculis metus, sed suscipit dui. Nunc mollis, ipsum at tristique dignissim, enim mi sodales nulla, sed dapibus lorem tortor et nisi.',
                active: false
            }
        ]
    }

    bindTabsChanged(callback) {
        this.onTabsChanged = callback
    }

    _commit(tabs, index) {
        this.onTabsChanged(tabs)
    }

    tabToggle(index) {
        this.tabs.map( (tab, i) => {
            if(parseInt(index) !== i) {
                tab.active = false;
            }
            else {
                tab.active = true;
            }
        })
        this._commit(this.tabs);
    }
  
}
  
/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    constructor() {
        this.app = this.getElement('#root')
        this.row = this.createElement('div', 'row');
        this.column = this.createElement('div', 'column');
        this.tabList = this.createElement('ul', 'tabs');
        this.tabContent = this.createElement('div', 'tabs-content');
        this.column.append(this.tabList);
        this.row.append(this.column);
        this.app.append(this.row, this.tabContent);
    }

    initializeTabs(tabs, handler) {
        if (tabs.length !== 0) {
            tabs.forEach( (tab, i) => {

                // Create nodes
                var tabNumber = i + 1;
                var li = this.createElement('li', 'tab-title');
                var link = this.createElement('a');
                var panel = this.createElement('div', 'tab-panel');
                var panelBody = this.createElement('p', 'tab-body');

                // Set Attributes and Text
                link.setAttribute('data-index', i);
                link.href = "#panel" + tabNumber;
                link.textContent = tab.linkText;
                panel.setAttribute('id', 'panel#' + tabNumber);
                panelBody.textContent = tab.bodyText;

                // Add event listener
                link.addEventListener('click', event => {
                    var index = event.target.dataset.index;
                    if(index) {
                        handler(index);
                    }
                    else {
                        //Debugging
                        console.log("Error tab number can't contain: ", index);
                    }
                })

                //Set classes for active tab
                if(tab.active) {
                    li.classList.add('active');
                    panel.classList.add('active');
                }

                // Append nodes
                li.append( link );
                panel.append(panelBody);
                this.tabList.append(li);
                this.tabContent.append(panel);
                
            })
        }
    
        // Debugging
        console.log(tabs)
    }
  
    createElement(tag, className) {
        const element = document.createElement(tag)
    
        if (className) element.classList.add(className)
    
        return element
    }
  
    getElement(selector) {
        const element = document.querySelector(selector)
    
        return element
    }

    displayTabs(tabs) {

        var length = tabs.length;
        var tabLinks = this.tabList.children;
        var tabPanels = this.tabContent.children;

        for(var i = 0; i < length; i++) {
            if(tabs[i].active) {
                tabLinks[i].classList.add('active');
                tabPanels[i].classList.add('active');
            }
            else {
                tabLinks[i].classList.remove('active');
                tabPanels[i].classList.remove('active');
            }
        }
    }
  
}
  
/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
//  */
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        //Explicit this binding
        this.model.bindTabsChanged(this.onTabsChanged);

        //Display initial tabs
        this.view.initializeTabs(this.model.tabs, this.handleTabToggle);
    }
  
    onTabsChanged = tabs => {
        this.view.displayTabs(tabs);
    }

    handleTabToggle = index => {
        this.model.tabToggle(index);
    }

}
  
const app = new Controller(new Model(), new View())