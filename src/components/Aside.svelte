<script>
  import { Link } from "svelte-routing";
  import { auth } from "../store/auth";
  import Skeleton from "./ui/Skeleton.svelte";

  let accordionItems = [];

  auth.subscribe((data) => {
    if (data.filled) {
      accordionItems = data.view.menu.left;
    }
  });

  let activeAccordionItem = null;
  const toggleItem = (idx) => {
    activeAccordionItem = activeAccordionItem === idx ? null : idx;
  };
</script>

<aside class="aside">
  <div class="aside__inner">
    <div class="aside__accordion accordion">
      {#if $auth.isLoading}
        <div
          class="accordion__item"
          style="display: flex; flex-direction: column; gap: 30px;"
        >
          {#each new Array(7) as _}
            <div style="overflow: hidden; border-radius: 50px">
              <Skeleton width="20px" height="20px" />
            </div>
          {/each}
        </div>
      {:else}
        {#each accordionItems as items, idx}
          <div
            class="accordion__item"
            class:active={activeAccordionItem === idx}
          >
            <button
              on:click={() => toggleItem(idx)}
              class="accordion__item-trigger"
            >
              <div class="accordion__item-title">
                {@html items.icon}
                <p>{items.name}</p>
              </div>

              {#if items.icon && items.length > 1}
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.41438 8.03151C3.67313 7.70806 4.1451 7.65562 4.46855 7.91438L9.00003 11.5396L13.5315 7.91438C13.855 7.65562 14.3269 7.70806 14.5857 8.03151C14.8444 8.35495 14.792 8.82692 14.4685 9.08568L9.46855 13.0857C9.19463 13.3048 8.80542 13.3048 8.53151 13.0857L3.53151 9.08568C3.20806 8.82692 3.15562 8.35495 3.41438 8.03151Z"
                    fill="black"
                  />
                </svg>
              {/if}
            </button>

            <div class="accordion__item-body">
              {#if items.length > 1}
                <ul class="accordion__item-list">
                  {#each items.slice(1) as submenuItem}
                    <!-- todo: поменять to="response.pageId" -->
                    <li class="accordion__item-link">
                      <Link to="/main-project">{submenuItem.name}</Link>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</aside>

<style lang="scss">
  .aside {
    position: fixed;
    z-index: 10;
    top: 90px;
    left: 0;
    bottom: 0;
    background: #fff;
    overflow-y: auto;
  }

  .aside__inner {
    gap: 15px;
    width: 20px;
    padding: 25px 25px;
    transition: width 0.1s linear;
  }

  .aside:hover .aside__inner {
    width: 300px;
  }

  /* =========== Accordion =========== */
  .accordion {
    font-size: 15px;
  }

  .accordion__item:not(:last-child) {
    margin-bottom: 15px;
  }

  .accordion__item-title.aside__current > svg > path {
    fill: #24cffb;
  }

  .accordion__item.active .accordion__item-trigger > svg {
    transform: rotateZ(-180deg);
  }

  .accordion__item-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .accordion__item-trigger > svg {
    display: none;
    flex-shrink: 0;
    transition: all 0.1s linear;
  }
  .aside:hover .accordion__item-trigger > svg {
    display: block;
  }

  .accordion__item-title {
    display: flex;
    align-items: center;
    margin-right: 5px;
    gap: 20px;
  }
  .accordion__item-title p {
    display: none;
  }
  .aside:hover .accordion__item-title p {
    display: block;
  }
  .accordion__item-title svg {
    flex-shrink: 0;
  }

  .accordion__item-body {
    display: grid;
    grid-template-rows: 0fr;
    font-size: 14px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    margin-left: 12px;
    transition: grid-template-rows 0.1s linear;
  }

  .accordion__item-list {
    overflow: hidden;
    margin-left: 50px;
  }

  .aside:hover .accordion__item.active .accordion__item-body {
    grid-template-rows: 1fr;
  }

  .accordion__item-link:not(:last-child) {
    margin-bottom: 10px;
  }
</style>
