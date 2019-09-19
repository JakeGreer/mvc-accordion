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
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat est velit egestas dui id ornare arcu odio. Integer quis auctor elit sed vulputate. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Mi proin sed libero enim sed faucibus. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Nibh tortor id aliquet lectus proin nibh. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Lectus nulla at volutpat diam ut venenatis tellus in. Bibendum est ultricies integer quis auctor elit sed vulputate. Odio morbi quis commodo odio aenean.',
                active: true
            },
            {
                hasHeader: false,
                linkText: 'Care',
                bodyText: 'Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales neque sodales ut. Ipsum dolor sit amet consectetur adipiscing. Faucibus vitae aliquet nec ullamcorper. Ac turpis egestas maecenas pharetra. Pellentesque id nibh tortor id. Semper eget duis at tellus at. Elementum nibh tellus molestie nunc non blandit massa. Facilisis mauris sit amet massa vitae tortor condimentum. Justo nec ultrices dui sapien eget mi proin sed. Eu scelerisque felis imperdiet proin. In hendrerit gravida rutrum quisque non tellus orci. Aliquet enim tortor at auctor urna. Tristique senectus et netus et malesuada fames ac. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Nunc scelerisque viverra mauris in aliquam sem. Purus sit amet luctus venenatis lectus. Vitae proin sagittis nisl rhoncus.',
                active: false
            },
            {
                hasHeader: true,
                linkText: 'Materials',
                bodyText: 'Ipsum dolor sit amet, consectetur adipiscing elit. Nullam nibh arcu, ultricies nec purus quis, consequat luctus orci. Sed non mi nisi. Donec vulputate erat odio, eget lacinia lectus accumsan sed. Phasellus diam lorem, ullamcorper quis velit a, ultricies facilisis turpis. Sed laoreet efficitur odio, ut consequat arcu iaculis non. Quisque lectus ligula, venenatis quis ullamcorper vitae, euismod in nisi. Sed sed arcu tortor. Phasellus a iaculis metus, sed suscipit dui. Nunc mollis, ipsum at tristique dignissim, enim mi sodales nulla, sed dapibus lorem tortor et nisi.',
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
                var link = this.createElement('a', 'tab');
                var accordionContainer = this.createElement('div', 'accordion-tab');
                var accordionHeader = this.createElement('h3');
                var accordionIcon = this.createElement('span')
                var panel = this.createElement('div', 'tab-panel');
                var panelBody = this.createElement('p', 'tab-body');

                // Set Attributes and Text
                link.setAttribute('data-index', i);
                accordionContainer.setAttribute('data-index', i);
                link.href = "#panel" + tabNumber;
                link.textContent = tab.linkText;
                accordionHeader.textContent = tab.linkText;
                accordionIcon.innerHTML = "&#x2b;";
                panel.setAttribute('id', 'panel#' + tabNumber);
                panelBody.textContent = tab.bodyText;

                // Add event listener
                var handleClick = event => this._handleTabClick(event, handler)
                link.addEventListener('click', handleClick );
                accordionContainer.addEventListener('click', handleClick);

                //Set classes for active tab
                if(tab.active) {
                    li.classList.add('active');
                    panel.classList.add('active');
                    accordionContainer.classList.add('active');
                    accordionIcon.innerHTML = '&#8722;';
                }

                // Append nodes
                li.append( link );
                panel.append(panelBody);
                accordionContainer.append( accordionHeader, accordionIcon);
                this.tabList.append(li);
                this.tabContent.append(accordionContainer, panel);
                
            })
        }
    
        // Debugging
        console.log(tabs)
    }

    _handleTabClick = (event, handler) => {
        var index = event.currentTarget.dataset.index;
        if(index) {
            handler(index);
        }
        else {
            //Debugging
            console.log("Error tab number can't contain: ", index);
        }
    }
  
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) {
            var classes = className.split(' ');
            for(var i = 0; i < classes.length; i++) {
                element.classList.add(classes[i])
            }
        }
    
        return element
    }
  
    getElement(selector) {
        const element = document.querySelector(selector)
    
        return element
    }

    displayTabs(tabs) {

        var length = tabs.length; //Will contain the same length as all HTML Collections below.

        var tabLinks = this.tabList.children;
        var tabPanels = this.tabContent.querySelectorAll('.tab-panel');
        var accordionIcons = this.tabContent.querySelectorAll('.accordion-tab span');

        for(var i = 0; i < length; i++) {
            if(tabs[i].active) {
                tabLinks[i].classList.add('active');
                tabPanels[i].classList.add('active');
                accordionIcons[i].innerHTML = '&#8722;'
            }
            else {
                tabLinks[i].classList.remove('active');
                tabPanels[i].classList.remove('active');
                accordionIcons[i].innerHTML = '&#x2b;';
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